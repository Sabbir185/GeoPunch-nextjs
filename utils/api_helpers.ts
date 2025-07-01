"use server"
import { cookies } from "next/headers";
import axios from "axios";

const API_URL = process.env.BACKEND_URL + 'api/v1';

const axiosApi = axios.create({
    baseURL: API_URL,
    validateStatus: function (status) {
        return status >= 200 && status < 600;
    },
})


axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

// Helper to get token from cookies
function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    return token || '';
}

// for data fetching
export async function get(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return await axiosApi.get(url, { ...config, params: data }).then(response => response.data)
}


// for data posting
export async function post(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axiosApi.defaults.headers.common["Content-Type"] = "application/json";
    return await axiosApi.post(url, data, { ...config }).then(response => response.data)
}

export async function patch(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axiosApi.defaults.headers.common["Content-Type"] = "application/json";
    return await axiosApi.patch(url, data, { ...config }).then(response => response.data)
}

export async function postForm(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`
    axiosApi.defaults.headers.common["Content-Type"] = "multipart/form-data"
    const form = new FormData()
    for (const key in data) {
        form.append(key, data[key])
    }
    return axiosApi
        .post(url, form, {...config})
        .then(response => response.data)
}


// for data updating
export async function put(url, data, queryValue, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return await axiosApi.put(url, { ...data }, { ...config, params: queryValue }).then(response => response.data)
}


// for data deleting
export async function del(url, data, config = {}) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return await axiosApi.delete(url, { ...config, params: data }).then(response => response.data)
}