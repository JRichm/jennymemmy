export default function MainHeader() {
    return (
        <div className="flex flex-row justify-between">
            <div>
                <p>logo</p>
            </div>
            <div className="flex flex-row gap-2">
                <a href="/">Home</a>
                <a href="/memories">Memories</a>
                <a href="/pictures">Pictures</a>
                <a href="/memories/new">New Memory</a>
            </div>
        </div>
    )
}