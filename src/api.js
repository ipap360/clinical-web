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

let tokenRenewalQueue = [], tokenFailureQueue = [];

const awaitTokenRenewal = (cb) => {
    tokenRenewalQueue.push(cb);
}

const awaitTokenFailure = (cb) => {
    tokenFailureQueue.push(cb);
}

const onTokenRenewed = () => {
    tokenFailureQueue = [];
    tokenRenewalQueue.map(cb => cb());
    tokenRenewalQueue = [];
}

const onTokenRenewalFailed = () => {
    tokenRenewalQueue = [];
    tokenFailureQueue.map(cb => cb());
    tokenFailureQueue = [];
}

// global
const STATUS_NOT_AUTHORIZED = 401;

// api specific
const TOKEN_EXPIRED = 490;
const TOKEN_NOT_FOUND = 491;
const INSUFFICIENT_PERMISSIONS = 492;

axios.interceptors.response.use(function (response) {
    const { data, status, statusText } = response;
    return { data, status, statusText };
}, function (error) {
    const { response, config } = error;
    if (response) {
        const { status, data, statusText } = response;
        // handle unauthorized && access token expired
        if (status === STATUS_NOT_AUTHORIZED && data && data.code === TOKEN_EXPIRED) {
            if (tokenRenewalQueue.length === 0) {
                postTokensRefresh().then(() => {
                    onTokenRenewed();
                }).catch(() => {
                    onTokenRenewalFailed();
                });
            }
            return new Promise((resolve, reject) => {
                awaitTokenRenewal(() => {
                    resolve(axios(config));
                });
                awaitTokenFailure(()=> {
                    reject(axios(config));
                });
            });
        }

        if (_.isObject(data)) {
            return Promise.reject({
                status,
                statusText,
                data
            });
        }

        if (statusText) {
            return Promise.reject({
                status,
                statusText,
                data: {
                    message: statusText
                }
            });
        }
    }

    const message = error.message || error;
    return Promise.reject({
        status: -1,
        statusText: message,
        data: {
            message
        }
    });

});

// extend login using previous tokens (used only in this file)
const postTokensRefresh = () => axios.post("/tokens/refresh");

// check whether I have a valid token or if I am visiting as a guest
export const getWhoami = () => axios.get("/users/_self");

// login using username & password
export const postTokens = ({ username, password }) => {
    return axios.post("/tokens?clientType=web", {
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
export const postUsers = ({payload}) => {
    return axios.post("/registrations/confirm", {
        payload
    });
}

export const getCalendar = () => {
    
}