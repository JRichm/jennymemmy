"use client"

import MainHeader from "@/app/components/mainHeader"

import Image from 'next/image'
import React, { useState } from 'react'

export default function NewMemoryPage() {

    interface formDataType {
        memoryName: string;
        memoryDate: Date;
        memoryDetails: string;
    }

    const [uploadedImages, setUploadedImages] = useState<string[]>([])  // array of images uploaded so far
    const [uploadedImageDate, setUploadedImageDate] = useState("")      // suggested date when user uploads pictures with attached date
    const [formData, setFormData] = useState<formDataType>({memoryName: "", memoryDate: new Date(), memoryDetails: ""}) // form data / user input

    // handle image upload
    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement & { target: { files: FileList } }>) {

        // get file(s) from file input
        const fileList = event.target.files;
        if (!fileList) return;
    
        // convert list to array
        const imagesArray = Array.from(fileList);
    
        // loop through file(s)
        for (const imageFile of imagesArray) {

            // get url from image
            const dataURL = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target?.result as string);
                };
                reader.onerror = reject;
                reader.readAsDataURL(imageFile);
            })

            // add url to list of all uploaded images
            setUploadedImages((prevImages) => [...prevImages, dataURL]);
        }
    }


    const AttachedImages = () => {
        const numImages = uploadedImages.length;
        const numCols = 4;
        let numRows = Math.ceil(numImages / numCols);
        if (numRows == 0) numRows = 1
       
        let elements = [];

        for (let i = 0; i < numRows * numCols; i++) {
            elements.push(
                <div key={i} className='flex aspect-square'>
                    { i < numImages ? (
                        <div className='h-full w-full'>
                            <img src={uploadedImages[i]} alt={`uploaded-${i}`} className='h-full w-full object-cover' />
                        </div>
                    ) : (
                        <div className='bg-black/10 rounded-lg h-full w-full flex items-center justify-center hover:bg-black/25 cursor-pointer transition-all'>
                            <Image src="/plus_icon.png" width={50} height={50} alt={'new'} className='opacity-[25%]' />
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={`grid grid-cols-${numCols} gap-2`}>
                { elements }
            </div>
        );
    }

    return (
        <main>
            <MainHeader />
            <div className="flex justify-center">
                <form className="flex flex-col bg-gray-200 p-4 gap-1">
                    <label htmlFor="mem-name">Memory Name</label>
                    <input type='text' name="mem-name"></input> 
                    <label htmlFor="mem-date">Memory Date</label>
                    <input type='date' name="mem-date"></input>
                    <label htmlFor="mem-name">Memory Details </label>
                    <input type='text' name="mem-details"></input>
                    <label htmlFor="mem-pictures">Memory Pictures</label>
                    <AttachedImages />
                    <input type="file" accept="image/*" onChange={handleImageUpload}></input>
                    <span className="flex flex-row justify-end gap-2">
                        <input type='button' value="Cancel" className="bg-red-300 px-3 rounded-l hover:cursor-pointer"></input>
                        <input type="submit" value="Add" className="bg-green-200 px-3 rounded-l hover:cursor-pointer"></input>
                    </span>
                </form>
            </div>
        </main>
    )
}