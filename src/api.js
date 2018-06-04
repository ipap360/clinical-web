// export api in a semantic way
// !! any (schema) change to the backend should affect only this file
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment-timezone';
import Cookies from 'js-cookie';

// initialize axios defaults (TODO: must read from configuration in production)
axios.defaults.baseURL = 'http://localhost:8081/api/v1';
axios.defaults.withCredentials = true;

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

let sessionRenewalQueue = [], sessionFailureQueue = [];

const awaitSessionRenewal = (cb) => {
    sessionRenewalQueue.push(cb);
}

const awaitSessionFailure = (cb) => {
    sessionFailureQueue.push(cb);
}

const onSessionRenewed = () => {
    sessionFailureQueue = [];
    sessionRenewalQueue.map(cb => cb());
    sessionRenewalQueue = [];
}

const onTokenRenewalFailed = (e2) => {
    sessionRenewalQueue = [];
    sessionFailureQueue.map(cb => cb(e2));
    sessionFailureQueue = [];
}

// global
const STATUS = {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
};

const CODE = {
    AUTH: {
        FAILED: -100,
        EXPIRED: -101
    }
}

const normalizeError = (error) => {
    const { response, config } = error;
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

axios.interceptors.response.use(function (response) {
    const { data, status, statusText } = response;
    return { data, status, statusText };
}, function (error) {
    const { response, config } = error;
    if (response) {
        const { status, data, statusText } = response;
        // handle unauthorized && access token expired
        if (status === STATUS.NOT_AUTHORIZED && data && data.code === CODE.AUTH.EXPIRED) {
            if (sessionRenewalQueue.length === 0) {
                refreshSession().then(() => {
                    onSessionRenewed();
                }).catch((e2) => {
                    onTokenRenewalFailed(e2);
                });
            }
            return new Promise((resolve, reject) => {
                awaitSessionRenewal(() => {
                    resolve(axios(config));
                });
                awaitSessionFailure((e2) => {
                    reject(normalizeError(e2));
                });
            });
        }
    }

    return Promise.reject(normalizeError(error));

});

// extend login using previous tokens (used only in this file)
const refreshSession = () => axios.post("/sessions/refresh");

// check whether I have a valid token or if I am visiting as a guest
export const getSession = () => axios.get("/sessions");

// login using username & password
export const newSession = ({ username, password }) => {
    return axios.post("/sessions", {
        username: username || '',
        password: password || '',
    });
}

// create registration
export const postRegistrations = ({ email, password }) => {
    return axios.post("/registrations", {
        email,
        password,
        url: window.location.href,
        locale: Cookies.get('lang'),
        timezone: moment.tz.guess()
    });
}

// confirm registration
export const postUsers = ({ payload }) => {
    return axios.post("/registrations/confirm", {
        payload
    });
}

export const getCalendar = () => {

}