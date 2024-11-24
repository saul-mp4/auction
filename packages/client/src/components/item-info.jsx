export function ItemInfo({ title, author, collection }) {
    return (
        <div className="rounded-sm border border-solid border-black">
            <h2 className="p-2">Item Info</h2>
            <ul className="list-none">
                <li className="p-2 bg-stone-200 rounded-sm  ">
                    <span className="font-bold">Title - </span>
                    <span>{title}</span>
                </li>
                <li className="p-2 bg-stone-200 rounded-sm  ">
                    <span className="font-bold">Author - </span>
                    <span>{author}</span>
                </li>
                <li className="p-2 bg-stone-200 rounded-sm  ">
                    <span className="font-bold">Collection - </span>
                    <span>{collection}</span>
                </li>
            </ul>
        </div>
    );
}
