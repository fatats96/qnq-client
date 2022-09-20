import axios from "axios";
import { getToken } from "../config/user-manager";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:5160/',
    headers: {
        "authorization": `Bearer ${getToken()}`,
    }
})

export { AxiosInstance };