export function App() {
    return (
        <>
            <h1 className="mb-4">Welcome</h1>
            <ul className="flex flex-col gap-2">
                <a href="/items" className="text-xl">
                    Item storage
                </a>
                <a href="/auctions" className="text-xl">
                    Your auctions
                </a>
                <a href="/auctions/create" className="text-xl">
                    Create new auction
                </a>
                <a href="/auctions/browse" className="text-xl">
                    Borwse active auctions
                </a>
            </ul>
        </>
    );
}
