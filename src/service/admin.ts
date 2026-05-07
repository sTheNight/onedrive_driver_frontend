import axios from "axios";
import { API_URL } from "./api";

export interface CurrentAdminUser {
    id: number;
    username: string;
}

export interface CurrentUserResponse {
    initialized: boolean;
    user: CurrentAdminUser;
}
export interface InitAdminUserRequest {
    username: string;
    password: string;
}

export function initAdminUser(request: InitAdminUserRequest) {
    return axios.post(`${API_URL}/admin/init`, request);
}

export function getCurrentUser() {
    return axios.get<CurrentUserResponse>(`${API_URL}/admin/me`);
}

export interface AdminLoginRequest {
    username: string;
    password: string;
}

export interface AdminLoginResponse {
    id: number;
    username: string;
}

export function login(request: AdminLoginRequest) {
    return axios.post<AdminLoginResponse>(`${API_URL}/admin/login`, request);
}
