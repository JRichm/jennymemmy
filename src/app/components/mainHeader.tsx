export default function MainHeader() {
    const linkStlye = 'border-b-0 border-transparent hover:border-b-4 hover:border-black hover:font-medium transition-all self-center'

    return (
        <div className="flex flex-row justify-between p-5 w-[1000px] self-center bg-gray-100 rounded-b-3xl">
            <div className="">
                <a href="/" className="text-pink-500 font-extrabold text-3xl">{`${'<3'}`}</a>
            </div>
            <div className="flex flex-row gap-5">
                <a className={`${linkStlye}`} href="/">Home</a>
                <a className={`${linkStlye}`} href="/memories">Memories</a>
                <a className={`${linkStlye}`} href="/pictures">Pictures</a>
                <a className={`${linkStlye}`} href="/memories/new">New Memory</a>
            </div>
        </div>
    )
}