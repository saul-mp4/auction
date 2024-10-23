<script>
    export let form;
</script>

<form
    class="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12"
    method="post"
>
    <h1 class="text-center">Sign in to your account</h1>
    <label class="text-lg flex flex-col gap-1" for="email">
        Email
        <input
            class="text-lg px-1"
            type="email"
            name="email"
            placeholder="moy@mail.com"
            required
        />
    </label>
    <label class="text-lg flex flex-col gap-1" for="password">
        Password
        <input
            class="text-lg px-1"
            type="password"
            name="password"
            placeholder="passssuort"
            required
        />
    </label>
    <button class="mt-4 text-lg p-1">Login</button>
    <a href="/register" class="text-lg mx-auto">Don't have account yet?</a>
</form>

{#if form?.error}
    <p class="text-xl text-red-600 text-center">{form.error}</p>
{/if}
