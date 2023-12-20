"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "./db";
import fs from 'fs';

const saveLocation = '/savedImages';

export async function saveMemory(formData: { name: string, date: Date, details: string }, uploadedImages: string[]) {
    console.log('saving memory')

    console.log('formData')
    console.log(formData)
    console.log('uploadedImages')
    console.log(uploadedImages)

    const time = new Date();

    try {
        const savedPictures = await Promise.all(uploadedImages.map(async (image: string) => {
            const imageName = Math.random().toString(36).substring(7);
            const location = `${saveLocation}/${imageName}`;

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

            // save picture to local storage at public/savedImages/
            await fs.promises.writeFile(`.${saveLocation}.jpg`, image, 'base64')

            console.log('The file would be saved at:', location);
            return { location, date: formData.date, time: time /*, other properties */ };
        }));

        const filteredPictures = savedPictures.filter(Boolean);
    } catch (err) {
        console.error('Error saving the memory:', err);
    }
}