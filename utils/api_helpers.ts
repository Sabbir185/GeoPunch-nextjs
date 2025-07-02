import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.BACKEND_URL + 'api/v1';

const axiosApi = axios.create({
    baseURL: API_URL,
    validateStatus: function (status: number) {
        return status >= 200 && status < 600;
    },
});

axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    return token || '';
}

export async function get(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;
    return await axiosApi.get(url, { ...config, params: data }).then(response => response.data);
}

export async function post(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;
    axiosApi.defaults.headers.common["Content-Type"] = "application/json";
    return await axiosApi.post(url, data, { ...config }).then(response => response.data);
}

export async function patch(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;
    axiosApi.defaults.headers.common["Content-Type"] = "application/json";
    return await axiosApi.patch(url, data, { ...config }).then(response => response.data);
}

export async function postForm(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;
    axiosApi.defaults.headers.common["Content-Type"] = "multipart/form-data";
    const form = new FormData();
    for (const key in data) {
        form.append(key, data[key]);
    }
    return axiosApi
        .post(url, form, { ...config })
        .then(response => response.data);
}

export async function put(
    url: string,
    data: any,
    queryValue: Record<string, any>,
    config: AxiosRequestConfig = {}
) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;
    return await axiosApi.put(url, { ...data }, { ...config, params: queryValue }).then(response => response.data);
}

export async function del(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${await getToken()}`;
    return await axiosApi.delete(url, { ...config, params: data }).then(response => response.data);
}