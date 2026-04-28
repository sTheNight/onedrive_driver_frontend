import axios from "axios"
const BASE_URL = "http://127.0.0.1:3000/api"
export function getFileList(path: string) {
    return axios.get(`${BASE_URL}/list/${path}`)
}
