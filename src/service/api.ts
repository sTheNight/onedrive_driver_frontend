import axios from "axios"
export const API_URL = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_DEVELOPMENT
    : import.meta.env.VITE_API_URL_PRODUCTION
export function getFileList(path: string) {
    return axios.get(`${API_URL}/list/${path}`)
}
