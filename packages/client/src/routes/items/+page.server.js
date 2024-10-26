import axios from 'axios';

export async function load({ cookies }) {
    const jwt = cookies.get('jwt');
    if (!jwt) {
        redirect(307, '/login');
    }
    const response = await axios.get('http://localhost:3000/items', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    return { items: response.data };
}
