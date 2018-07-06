// export api in a semantic way
// !! any (schema) change to the backend should affect only this file
import axios from 'axios';
import * as session from './session';
import { toQueryParams } from './utils';

export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
};

export const API_STATUS = -101;

const net = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
});

const normalizeError = (error) => {
    const { response } = error;
    if (response) {
        const { status, data, statusText } = response;
        if (_.isObject(data)) {
            return {
                status,
                statusText,
                data
            };
        }
        if (statusText) {
            return {
                status,
                statusText,
                data: {
                    message: statusText
                }
            };
        }
    }
    const message = error.message || error;
    return {
        status: -1,
        statusText: message,
        data: {
            message
        }
    };
}

instance.interceptors.response.use(function (response) {
    const { data, status, statusText } = response;
    return { data, status, statusText };
}, function (error) {
    const { response, config } = error;
    if (response) {
        const { status, data, statusText } = response;
        // handle unauthorized && access token expired
        if (status === HTTP_STATUS.NOT_AUTHORIZED && data && data.code === CODE.AUTH.EXPIRED) {
            
        }
    }

    return Promise.reject(normalizeError(error));

});


// check whether I have a valid token or if I am visiting as a guest
export const getSession = () => {
    const { uuid } = session.get();
    return net.get("/sessions?uuid=" + uuid);
}


// login using username & password
export const newSession = ({ username, password }) =>
    net.post("/sessions", {
        username: username || '',
        password: password || '',
    });

// check whether I have a valid token or if I am visiting as a guest
export const refreshSession = () => {
    const { uuid } = session.get();
    return net.post("/sessions/refresh", {
        uuid
    }).then(response => {
        return response;
    }).catch(e => {
        return e;
    });
}


// check whether I have a valid token or if I am visiting as a guest
export const expireSession = () => {
    const { uuid } = session.get();
    return net.post("/sessions/expire", {
        uuid
    });
}

// create registration
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

export const getCalendarEvent = (id) =>
    net.get("/calendar-events/" + id);

export const saveCalendarEvent = ({ id, ...data }) =>
    net.post("/calendar-events/" + id, data);

export const deleteCalendarEvent = (id) =>
    net.post("/calendar-events/" + id + "/remove");

export const postponeCalendarEvent = ({ id, ...data }) =>
    net.post("/calendar-events/" + id + "/postpone", data);

export const copyCalendarEvent = ({ id, ...data }) =>
    net.post("/calendar-events/" + id + "/copy", data);

export const getPersons = ({ ...params }) =>
    net.get("/persons" + toQueryParams(params));


export const getPerson = (id) =>
    net.get("/persons/" + id);

export const savePerson = (data) =>
    net.post("/persons", data);

export const deletePerson = (id) =>
    net.post("/persons/" + id + "/remove");
