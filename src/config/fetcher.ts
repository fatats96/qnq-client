import axios from 'axios';
import { getToken } from './user-manager';

export const fetcher = (url: string) => axios.get(url, {
    headers: {
        authorization: `Bearer ${getToken()}`
    }
}).then(res => res.data);