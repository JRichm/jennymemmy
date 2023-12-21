export default function MainHeader() {
    const linkStlye = 'border-b-0 border-transparent hover:border-b-4 hover:border-black hover:font-medium transition-all self-center'

    return (
        <div className="flex flex-row justify-between border-b p-3">
            <div>
                <p className="text-pink-500 font-extrabold text-3xl">{`${'<3'}`}</p>
            </div>
            <div className="flex flex-row gap-2">
                <a className={`${linkStlye}`} href="/">Home</a>
                <a className={`${linkStlye}`} href="/memories">Memories</a>
                <a className={`${linkStlye}`} href="/pictures">Pictures</a>
                <a className={`${linkStlye}`} href="/memories/new">New Memory</a>
            </div>
        </div>
    )
}