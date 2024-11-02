export function Login() {
    return (
        <form
            className="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12"
            method="post"
        >
            <h1 className="text-center mb-4">Sign in to your account</h1>
            <label className="text-lg flex flex-col gap-1" for="email">
                Email
                <input
                    className="text-lg px-1"
                    type="email"
                    name="email"
                    placeholder="moy@mail.com"
                    required
                />
            </label>
            <label className="text-lg flex flex-col gap-1" for="password">
                Password
                <input
                    className="text-lg px-1"
                    type="password"
                    name="password"
                    placeholder="passssuort"
                    required
                />
            </label>
            <button className="mt-4 text-lg p-1">Login</button>
            <a href="/register" className="text-lg mx-auto">
                Don't have account yet?
            </a>
        </form>
    );
}