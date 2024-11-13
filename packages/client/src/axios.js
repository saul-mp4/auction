import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function login(email, password) {
    const response = await instance.post('/login', {
        email,
        password,
    });

    localStorage.setItem('jwt', response.data);
    return response;
}

export const auctionRequests = {
    getAll: async () => {
        return await instance.get('/auctions');
    },
    getOne: async (id) => {
        return await instance.get(`/auctions/${id}`);
    },
    delete: async (id) => {
        return await instance.delete('/auctions', {
            data: {
                id,
            },
        });
    },
    post: async (title, startTime) => {
        return await instance.post('/auctions', {
            title,
            startTime,
        });
    },
};
