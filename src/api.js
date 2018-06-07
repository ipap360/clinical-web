// export api in a semantic way
// !! any (schema) change to the backend should affect only this file
import moment from 'moment-timezone';
import Cookies from 'js-cookie';
import { net } from 'utils';

// initialize axios defaults (TODO: must read from configuration in production)
// axios.defaults.baseURL = 'http://localhost:8081/api/v1';
// axios.defaults.withCredentials = true;

// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Accept'] = 'application/json';

// let sessionRenewalQueue = [], sessionFailureQueue = [];

// const awaitSessionRenewal = (cb) => {
//     sessionRenewalQueue.push(cb);
// }

// const awaitSessionFailure = (cb) => {
//     sessionFailureQueue.push(cb);
// }

// const onSessionRenewed = () => {
//     sessionFailureQueue = [];
//     sessionRenewalQueue.map(cb => cb());
//     sessionRenewalQueue = [];
// }

// const onTokenRenewalFailed = (e2) => {
//     sessionRenewalQueue = [];
//     sessionFailureQueue.map(cb => cb(e2));
//     sessionFailureQueue = [];
// }

// check whether I have a valid token or if I am visiting as a guest
export const getSession = () => net.get("/sessions");

// login using username & password
export const newSession = ({ username, password }) => {
    return net.post("/sessions", {
        username: username || '',
        password: password || '',
    });
}

// check whether I have a valid token or if I am visiting as a guest
export const expireSession = () => net.post("/sessions/expire");

// create registration
export const newRegistration = ({ email, password }) => {
    return net.post("/registrations", {
        email,
        password,
        url: window.location.href,
        locale: Cookies.get('lang'),
        timezone: moment.tz.guess()
    });
}

// confirm registration
export const confirmRegistrations = ({ payload }) => {
    return net.post("/registrations/confirm", {
        payload
    });
}

export const getCalendar = () => {

}