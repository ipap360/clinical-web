import axios from 'axios';
import { isObject } from '../utils';

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const HTTP_STATUS = {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};

const API_STATUS = -101;

const net = axios.create({
    baseURL: BASE_URL + "/api/v1",
    withCredentials: true,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
});

const normalizedResponse = (error) => {
    const { response } = error;
    const re = { reLogin: false, reAuth: false };
    if (response) {
        const { status, data, statusText } = response;
        const noAuth = status === HTTP_STATUS.NOT_AUTHORIZED;
        const reAuth = noAuth && data.code === API_STATUS;
        if (isObject(data)) {
            return {
                ...response,
                reAuth,
                reLogin: noAuth && !reAuth
            };
        }
        return { ...response, data: { message: statusText }, ...re, reLogin: noAuth };
    }
    const message = error.message || error;
    return { status: null, statusText: message, data: { message }, ...re };
}

net.interceptors.response.use(function (response) {
    const { data, status, statusText } = response;
    return { data, status, statusText };
}, function (error) {
    return Promise.reject(normalizedResponse(error));
});

export default net;

export const toQueryParams = (json = {}) => {
    const keys = Object.keys(json);
    return (keys.length === 0) ? '' : '?' + keys.filter(key => json[key] !== undefined).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
    }).join('&');
}
