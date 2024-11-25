import { Form } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { itemsRequests } from '../axios';

export function AuctionsCreate() {
    const query = useQuery({
        queryKey: ['items'],
        queryFn: itemsRequests.getAll,
    });

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
            <label className="text-lg flex flex-col gap-1" htmlFor="items">
                Choose your item
                <select name="items" id="items" className="text-lg p-2">
                    {query.data?.data.map(({ id, title }) => {
                        return (
                            <option value={id} key={id}>
                                {title}
                            </option>
                        );
                    })}
                </select>
            </label>
            <button className="mt-4 text-lg p-1">Create auction room</button>
        </Form>
    );
}
