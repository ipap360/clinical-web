// export api in a semantic way
// !! any (schema) change to the backend should affect only this file
import net from './net';
import * as session from './session';
import { toQueryParams } from './utils';

export const AUTH = {
    FAILED: -100,
    EXPIRED: -101
}

export const AUTH_EXPIRED = -101;

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
