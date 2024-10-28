<script>
    export let data;
    console.log(data);
</script>

<div class="ml-24">
    <div>
        <h1>Other auctions</h1>

        <table class="text-xl table-auto border-collapse">
            <thead>
                <tr
                    class="border-solid border-y-2 border-x-0 border-slate-500 *:p-2"
                >
                    <th>Auction title</th>
                    <th>Start time</th>
                    <th>End time</th>
                </tr>
            </thead>
            <tbody>
                {#each data.others as { title, startTime, endTime }}
                    <tr class="odd:bg-white even:bg-slate-200 *:p-2">
                        <td>{title}</td>
                        <td>{new Date(startTime)}</td>
                        <td>{endTime}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div>
        <h1>Your auctions</h1>

        <table class="text-xl table-auto border-collapse">
            <thead>
                <tr
                    class="border-solid border-y-2 border-x-0 border-slate-500 *:p-2"
                >
                    <th>Auction title</th>
                    <th>Start time</th>
                    <th>End time</th>
                </tr>
            </thead>
            <tbody>
                {#each data.others as { title, startTime, endTime }}
                    <tr class="odd:bg-white even:bg-slate-200 *:p-2">
                        <td>{title}</td>
                        <td>{new Date(startTime)}</td>
                        <td>{endTime}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
