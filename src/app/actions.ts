"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "./db";
import fs from 'fs';
import path from 'path';

const saveLocation = '/savedImages';

export async function saveMemory(formData: { name: string, date: Date, details: string }, uploadedImages: string[]) {
    console.log('saving memory')

    console.log('formData')
    console.log(formData)
    console.log('uploadedImages')
    console.log(uploadedImages)

    const time = new Date();

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

            console.log('image')
            console.log(image)
            var base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
            console.log('base64Data')
            console.log(base64Data)

            await fs.writeFile(imagePath, base64Data, 'base64', err => console.log(err))

            // Create a single picture record for each image
            const savedPicture = await prisma.picture.create({
                data: {
                    location: location,
                    date: new Date(formData.date).toISOString(),
                    created: time.toISOString(),
                    updated: time.toISOString(),
                    // other properties
                },
            });

            console.log('Entered in the database');
            console.log('The file would be saved at:', location);

            return { location, date: formData.date, time: time /*, other properties */ };
        }));

        const filteredPictures = savedPictures.filter(Boolean);
        
    } catch (err) {
        console.error('Error saving the memory:', err);
    }
}