import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
    baseURL: 'http://localhost:3000/api',
});


// todo: interceptors
tesloApi.interceptors.request.use(
    (config) => {

        //const token = localStorage.getItem('token'); // lo tomamos desde el localStore
        const token = useAuthStore.getState().token; // accedemos al estado de la store directamente
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export {
    tesloApi
}
