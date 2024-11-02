export function Register() {
    return (
        <form className="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12">
            <h1 className="text-center mb-4">Register new account</h1>
            <label className="text-lg flex flex-col gap-1" for="fullName">
                Name and Surname
                <input
                    className="text-lg px-1"
                    type="text"
                    name="fullName"
                    placeholder="Mister Twister"
                    required
                />
            </label>
            <label className="text-lg flex flex-col gap-1" for="email">
                Email
                <input
                    className="text-lg px-1"
                    type="email"
                    name="email"
                    placeholder="sobaka@mail.com"
                    required
                />
            </label>
            <label className="text-lg flex flex-col gap-1" for="password">
                Password
                <input
                    className="text-lg px-1"
                    type="text"
                    name="password"
                    placeholder="123456"
                    required
                />
            </label>
            <button className="mt-4 text-lg p-1">Create account</button>
        </form>
    );
}