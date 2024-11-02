export function Items() {
    return (
        <>
            <h1>Your items</h1>

            <table class="text-xl table-auto border-collapse">
                <thead>
                    <tr class="border-solid border-y-2 border-x-0 border-slate-500 *:p-2">
                        <th>Item Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-white even:bg-slate-200 *:p-2">
                        <td>Name</td>
                        <td>Price</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
