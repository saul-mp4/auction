import { format } from 'date-fns';
import { Form } from 'react-router-dom';

export function AuctionsCreate() {
    // eslint-disable-next-line quotes
    const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");

    return (
        <Form
            className="flex flex-col gap-2 w-1/2 mx-auto mt-24 text-xl mb-12"
            method="post"
        >
            <h1 className="text-center">Create new auction</h1>
            <label className="text-lg flex flex-col gap-1" htmlFor="fullName">
                Title
                <input
                    className="text-lg px-1"
                    defaultValue="JP Morgan"
                    type="text"
                    name="title"
                    placeholder="My auction room"
                    required
                />
            </label>
            <label className="text-lg flex flex-col gap-1" htmlFor="email">
                Start time
                <input
                    className="text-lg px-1"
                    type="datetime-local"
                    name="startTime"
                    min={now}
                    required
                />
            </label>
            <button className="mt-4 text-lg p-1">Create auction room</button>
        </Form>
    );
}
