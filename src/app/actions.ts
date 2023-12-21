"use server"
import { prisma } from "./db";
import fs from 'fs';
import path from 'path';

const saveLocation = '/savedImages';

export async function saveMemory(formData: { name: string, date: Date, details: string }, uploadedImages: string[]) {

    const time = new Date();

    // create db record of memory
    const memory = await prisma.memory.create({
        // user input
        data: {
            name: formData.name,
            description: formData.details,
            date: time.toISOString(),
            created: time
        }
    })

    // save pictures
    try {

        // Ensure that the save directory exists
        const directoryPath = path.join(process.cwd(), 'public', saveLocation);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        // save each image individually
        const savedPictures = await Promise.all(uploadedImages.map(async (image: string) => {
            // name of saved image
            const imageName = Math.random().toString(36).substring(7);
            const imageFileName = `${imageName}.jpg`;

            // saved image location
            const location = `${saveLocation}/${imageFileName}`;
            const imagePath = path.join(directoryPath, imageFileName);

            // image data
            var base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')

            // write image file
            await fs.writeFile(imagePath, base64Data, 'base64', err => console.log(err));

            // Create db record for the image
            const savedPicture = await prisma.picture.create({
                // image data
                data: {
                    location: location,
                    date: new Date(formData.date).toISOString(),
                    created: time.toISOString(),
                    memoryId: memory.id
                },
            });

            return { location, date: formData.date, time: time };
        }));

        const filteredPictures = savedPictures.filter(Boolean);
        
    } catch (err) {
        console.error('Error saving the memory:', err);
    }
}