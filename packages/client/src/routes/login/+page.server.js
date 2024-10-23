import axios from 'axios';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        try {
            const data = await request.formData();
            const response = await axios.post('http://localhost:3000/login', {
                email: data.get('email'),
                password: data.get('password'),
            });

            cookies.set('jwt', response.data, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24,
            });
        } catch (e) {
            return { error: e.message };
        }

        redirect(303, '/');
    },
};
