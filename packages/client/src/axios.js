import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

const jwt = localStorage.getItem('jwt');

if (!jwt) {
    instance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data}`;
}

export async function login(email, password) {
    const response = await instance.post('/login', {
        email,
        password,
    });

    localStorage.setItem('jwt', response.data);
    instance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data}`;

    return response;
}
