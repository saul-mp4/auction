import { Form, Link } from 'react-router-dom';

export function Login() {
    return (
        <Form
            className="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12"
            method="post"
        >
            <h1 className="text-center mb-4">Sign in to your account</h1>
            <label className="text-lg flex flex-col gap-1" htmlFor="email">
                Email
                <input
                    className="text-lg px-1"
                    type="email"
                    name="email"
                    placeholder="moy@mail.com"
                    required
                />
            </label>
            <label className="text-lg flex flex-col gap-1" htmlFor="password">
                Password
                <input
                    className="text-lg px-1"
                    type="password"
                    name="password"
                    placeholder="passssuort"
                    required
                />
            </label>
            <button className="mt-4 text-lg p-1" type="submit">
                Login
            </button>
            <Link to="/register" className="text-lg mx-auto">
                Don&apos;t have account yet?
            </Link>
        </Form>
    );
}
