import axios from 'axios';

export async function load({ cookies }) {
    const jwt = cookies.get('jwt');
    if (!jwt) {
        redirect(307, '/login');
    }
    const my = await axios.get('http://localhost:3000/auctions/my', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    const others = await axios.get('http://localhost:3000/auctions/others', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });

    return { my: my.data, others: others.data };
}
