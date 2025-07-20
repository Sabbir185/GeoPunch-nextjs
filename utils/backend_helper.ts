import {get, post, patch, del, postForm} from './api_helpers'
// user API's
// export const userLogin = (data: Record<string, unknown>) => post('/user/login', data);
// export const getUserList = (data: Record<string, unknown>) => get('/user/list', data)
// export const updateUser = (data: Record<string, unknown>) => patch('/user/update/admin', data)
// export const delUser = (data: Record<string, unknown>) => del('/user', data)
//
// // bucket file upload
// export const postSingleFile = (data: Record<string, unknown>) => postForm('/file/single-file-upload', data)
//
// // translations
// export const fetchTranslations = (data: Record<string, unknown>) => get("/language/translation", data);
// export const fetchAllLanguages = (data: Record<string, unknown>) => get("/language/all", data);

// Location
export const fetchLocationList = (data: Record<string, unknown>) => get('/location', data)
export const delLocation = (data: Record<string, unknown>) => del('/location', data)


// users
export const fetchUserList = (data: Record<string, unknown>) => get('/user/list', data)
export const updateUser = (data: Record<string, unknown>) => patch('/user/registration', data)
export const delUser = (data: Record<string, unknown>) => del('/user/delete', data)

// place of presence
export const fetchPlaceList = (data: Record<string, unknown>) => get('/place-of-presence', data)
export const updatePlace = (data: Record<string, unknown>) => patch('/place-of-presence', data)
export const delPlace = (data: Record<string, unknown>) => del('/place-of-presence', data)
export const createPlace = (data: Record<string, unknown>) => post('/place-of-presence', data)

export const fetchUserActivityList = (data: Record<string, unknown>) => get('/user/activity', data)
export const fetchActivityListAdmin = (data: Record<string, unknown>) => get('/attendance-logs', data)

// Email logs
export const fetchEmailLogList = (data: Record<string, unknown>) => get('/email/logs', data)

