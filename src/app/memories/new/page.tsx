"use client"

import MainHeader from "@/app/components/mainHeader"

import Image from 'next/image'
import React, { useState } from "react"

import { saveMemory } from "@/app/actions"

export default function NewMemoryPage() {

    interface formDataType {
        name: string;
        date: Date;
        details: string;
    }

    // array of images uploaded so far
    const [uploadedImages, setUploadedImages] = useState<string[]>([])

    // form data / user input
    const [formData, setFormData] = useState<formDataType>({name: "", date: new Date(), details: ""}) 


    
    // handle user input 
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        // get values from changed input
        const { name, value } = e.target;

        // update formData with new input        
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    // handler for form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        // prevent page refresh
        e.preventDefault()

        // user input validation

        try {
            // save memory
            await saveMemory(formData, uploadedImages)

            // redirect back to all memories
            .then(() => window.location.href = '/memories')
        
        // error handling
        } catch (err) {
            console.error(err)
        }
    }

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


    // uploaded image preview 
    const AttachedImages = () => {

        // number of columns to display
        const numCols = 4;
        const numImages = uploadedImages.length;

        // calculate number of rows based on how many images have been uploaded and number of columns
        let numRows = Math.ceil(numImages / numCols);
        if (numRows == 0) numRows = 1
       
        let elements = [];

        for (let i = 0; i < numRows * numCols; i++) {
            elements.push(
                <div key={i} className='flex aspect-square'>
                    { i < numImages ? (
                        <div className='max-w-[80px] max-h-[80px] rounded'>
                            <img src={uploadedImages[i]} alt={`uploaded-${i}`} className='rounded-lg max-w-[80px] max-h-[80px]' />
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
            <div className={`grid grid-cols-4 gap-2`}>
                { elements }
            </div>
        );
    }

    return (
        <main>
            <MainHeader />
            <div className="flex justify-center p-12">
                <form className="flex flex-col bg-gray-200 p-4 gap-1" onSubmit={ handleSubmit }>
                    <label htmlFor="mem-name">Memory Name</label>
                    <input type='text' name="name" onChange={handleInputChange}></input> 
                    <label htmlFor="mem-date">Memory Date</label>
                    <input type='date' name="date" onChange={handleInputChange}></input>
                    <label htmlFor="mem-name">Memory Details </label>
                    <input type='text' name="details" onChange={handleInputChange}></input>
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