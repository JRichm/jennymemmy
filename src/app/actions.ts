"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "./db";
import fs from 'fs';
import path from 'path';

const saveLocation = '/savedImages';

export async function saveMemory(formData: { name: string, date: Date, details: string }, uploadedImages: string[]) {

    const time = new Date();

    const memory = await prisma.memory.create({
        data: {
            name: formData.name,
            description: formData.details,
            date: time.toISOString(),
            created: time
        }
    })

    try {
        // Ensure that the directory exists
        const directoryPath = path.join(process.cwd(), 'public', saveLocation);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const savedPictures = await Promise.all(uploadedImages.map(async (image: string) => {
            const imageName = Math.random().toString(36).substring(7);
            const imageFileName = `${imageName}.jpg`;
            const location = `${saveLocation}/${imageFileName}`;
            const imagePath = path.join(directoryPath, imageFileName);

            var base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')

            await fs.writeFile(imagePath, base64Data, 'base64', err => console.log(err));

            // Create a single picture record for each image
            const savedPicture = await prisma.picture.create({
                data: {
                    location: location,
                    date: new Date(formData.date).toISOString(),
                    created: time.toISOString(),
                    memoryId: memory.id
                },
            });

            return { location, date: formData.date, time: time /*, other properties */ };
        }));

        const filteredPictures = savedPictures.filter(Boolean);
        
    } catch (err) {
        console.error('Error saving the memory:', err);
    }
}