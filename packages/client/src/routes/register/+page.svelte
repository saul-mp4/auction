<script>
    export let form;
</script>

<form
    class="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12"
    method="post"
>
    <h1 class="text-center">Register new account</h1>
    <label class="text-lg flex flex-col gap-1" for="fullName">
        Name and Surname
        <input
            class="text-lg px-1"
            type="text"
            name="fullName"
            placeholder="Mister Twister"
            required
        />
    </label>
    <label class="text-lg flex flex-col gap-1" for="email">
        Email
        <input
            class="text-lg px-1"
            type="email"
            name="email"
            placeholder="sobaka@mail.com"
            required
        />
    </label>
    <label class="text-lg flex flex-col gap-1" for="password">
        Password
        <input
            class="text-lg px-1"
            type="text"
            name="password"
            placeholder="123456"
            required
        />
    </label>
    <button class="mt-4 text-lg p-1">Create account</button>
</form>

{#if form?.error}
    <p class="text-xl text-red-600 text-center">{form.error}</p>
{/if}
