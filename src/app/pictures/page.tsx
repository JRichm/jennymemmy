import MainHeader from "../components/mainHeader";
import { prisma } from "../db";

export default async function PicturesPage() {

    const pictures = await prisma.picture.findMany({
        include: {
            memory: true
        }
    })

    return (
        <main className="flex flex-col">
            <MainHeader />
            <div>
                <p>this is the pictures page</p>
                <hr />
                <div>
                    { pictures.map ((picture) => (
                        <div key={picture.id} className="border-b flex flex-row place-items-center p-2">
                            <p className="w-[100px] text-right">{picture.id}</p>
                            <p className="w-[300px] text-center">{picture.location}</p>
                            <p className="w-[300px] text-center">{picture.date.toDateString()}</p>
                            <p className="w-[300px] text-center">{picture.created.toDateString()}</p>
                            <p className="w-[300px] text-center">{picture.updated ? picture.updated.toDateString() : 'not updated'}</p>
                            <p className="w-[300px] text-center">{picture.memoryId && picture.memory ? `${picture.memory.name} (${picture.memoryId})` : 'no memory'}</p>
                            <div>
                                <img src={`${picture.location}`} className="max-h-[50px]"></img>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}