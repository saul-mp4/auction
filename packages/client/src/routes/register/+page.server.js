import axios from 'axios';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        try {
            const data = await request.formData();
            await axios.post('http://localhost:3000/register', {
                fullName: data.get('fullName'),
                email: data.get('email'),
                password: data.get('password'),
            });
        } catch (e) {
            return { error: e.message };
        }
        redirect(307, '/login');
    },
};
