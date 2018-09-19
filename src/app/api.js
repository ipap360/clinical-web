// export api in a semantic way
// !! any (schema) change to the backend should affect only this file
import axios from 'axios';
import { toQueryParams, isObject } from './utils';

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

// check whether I have a valid token or if I am visiting as a guest
export const getSession = ({ uuid = "0" }) => {
    return net.get("/sessions/" + uuid);
}

// login using username & password
export const newSession = ({ username, password }) =>
    net.post("/sessions", {
        username: username || '',
        password: password || '',
    });

// check whether I have a valid token or if I am visiting as a guest
export const refreshSession = ({ uuid= "0" }) => {
    return net.post("/sessions/" + uuid + "/refresh").then(response => {
        return response;
    }).catch(e => {
        return e;
    });
}

// check whether I have a valid token or if I am visiting as a guest
export const expireSession = ({ uuid = "0" }) => {
    return net.post("/sessions/" + uuid + "/expire");
}

// sign uuuup
export const newRegistration = ({ email, password, locale, timezone, url }) =>
    net.post("/registrations", {
        email,
        password,
        locale,
        timezone,
        url
    });

// confirm registration
export const confirmRegistrations = ({ token }) =>
    net.post("/registrations/confirm", {
        token
    });

export const getCalendars = () =>
    net.get("/calendars/");

export const getCalendar = ({ id, ...data }) =>
    net.get("/calendar/" + id + toQueryParams(data));

export const calendarEvents = ({ from, to, patient }) => {
    return net.get("/calendar-events" + toQueryParams({ from, to, patient }));
}

export const roomAvailability = ({ from, to }) => {
    return net.get("/room-availability" + toQueryParams({
        from, to
    }));
}

export const viewCalendarEvent = (id) =>
    net.get("/calendar-events/" + id);

export const upsertCalendarEvent = ({
    id = 0,
    ...data
}) => {
    return net.post("/calendar-events/" + id, data);
}


export const deleteCalendarEvent = (id) =>
    net.post("/calendar-events/" + id + "/delete");

export const postponeCalendarEvent = ({ id, ...data }) =>
    net.post("/calendar-events/" + id + "/postpone", data);

export const copyCalendarEvent = ({ id, ...data }) =>
    net.post("/calendar-events/" + id + "/copy", data);

export const getPersons = ({ ...params }) => {
    return net.get("/patients" + toQueryParams(params));
}

export const getPerson = (id) => net.get("/patients/" + id);

export const savePerson = ({ id = 0, ...data }) => {
    return net.post("/patients/" + id, data);
}

export const deletePerson = (id) =>
    net.post("/patients/" + id + "/delete");
