import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_HTTP_URL,
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

export async function register(fullName, email, password) {
    const response = await instance.post('/register', {
        fullName,
        email,
        password,
    });

    return response;
}

export const auctionRequests = {
    getAll: async () => {
        return await instance.get('/auctions');
    },
    getAllOther: async () => {
        return await instance.get('/auctions/browse');
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
    post: async (title, startTime, itemId) => {
        return await instance.post('/auctions', {
            title,
            startTime,
            itemId,
        });
    },
};

export const itemsRequests = {
    getAll: async () => {
        return await instance.get('/items');
    },
};
