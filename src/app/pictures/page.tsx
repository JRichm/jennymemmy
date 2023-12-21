import MainHeader from "../components/mainHeader";
import { prisma } from "../db";

export default async function PicturesPage() {

    const pictures = await prisma.picture.findMany()

    return (
        <main>
            <MainHeader />
            <div>
                <p>this is the pictures page</p>
                <div>
                    { pictures.map ((picture) => (
                        <div key={picture.id} className="border flex flex-row place-items-center p-2">
                            <p className="w-[100px] text-right">{picture.id}</p>
                            <p className="w-[300px] text-center">{picture.location}</p>
                            <p className="w-[300px] text-center">{picture.date.toDateString()}</p>
                            <p className="w-[300px] text-center">{picture.created.toDateString()}</p>
                            {picture.updated ? <p className="w-[300px] text-center">{picture.updated.toDateString()}</p> : null}
                            {picture.memoryId ? <p className="w-[300px] text-center">{picture.memoryId}</p> : null}
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