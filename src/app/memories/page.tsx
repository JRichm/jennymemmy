import MainHeader from "../components/mainHeader";
import { prisma } from "../db";

export default async function MemoriesPage() {

    const memories = await prisma.memory.findMany({
        include: {
            pictures: true, // Include the pictures relation
        },
    });

    return (
        <main className="flex flex-col">
            <MainHeader />
            <div>
                <p>this is the memories page</p>
                <div>
                    { memories.map ((memory) => (
                        <div key={memory.id} className="border-b flex flex-row place-items-center p-2">
                            <p className="w-[100px] text-right">{memory.id}</p>
                            <p className="w-[300px] text-center">{memory.name}</p>
                            <p className="w-[300px] text-center">{memory.description}</p>
                            <p className="w-[300px] text-center">{memory.date.toDateString()}</p>
                            <p className="w-[300px] text-center">{memory.created.toDateString()}</p>
                            {memory.updated ? <p className="w-[300px] text-center">{memory.updated.toDateString()}</p> : null}
                            
                            {/* Render pictures if available */}
                            {memory.pictures && memory.pictures.length > 0 ? (
                                <div className="flex flex-row gap-2">
                                    {memory.pictures.map((picture) => (
                                        <div key={picture.id}>
                                            <img src={`${picture.location}`} className="max-h-[50px]"></img>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className="h-[50px] place-items-center flex"><p>No associated images</p></div>}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}