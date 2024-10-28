<script>
    export let data;
</script>

<div class="ml-24">
    <h1>Welcome {data.fullName}!</h1>
    <ul class="flex flex-col gap-2">
        <a href="/items" class="text-xl">Item storage</a>
        <a href="/auctions" class="text-xl">Borwse auctions</a>
    </ul>
</div>
