// export api in a semantic way
// !! any (schema) change to the backend should affect only this file
import axios from 'axios';
import _ from 'lodash';

// initialize axios defaults (TODO: must read from configuration in production)
axios.defaults.baseURL = 'http://localhost:8081/api/v1';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

let tokenRenewalQueue = [];

const awaitTokenRenewal = (cb) => {
    tokenRenewalQueue.push(cb);
}

const onTokenRenewed = () => {
    tokenRenewalQueue.map(cb => cb());
    tokenRenewalQueue = [];
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    
    const { response, config } = error;
    
    if (response) {

        console.log(response);

        const { status, data } = response;

        // handle unauthorized && access token expired
        if (status === 401 && data && data.code === 490) {

            if (tokenRenewalQueue.length === 0) {
                postTokensRenew().then(() => {
                    onTokenRenewed();
                });
            }

            return new Promise((resolve, reject) => {
                awaitTokenRenewal(() => {
                    resolve(axios(config));
                });
            });
            
        }

        if (_.isObject(data)) {
            return Promise.reject(data);
        }
    }

    const message = error.message || error;

    return Promise.reject({message});
});

// extend login using previous tokens (used only in this file)
const postTokensRenew = () => axios.post("/tokens/renew");

// check whether I have a valid token or if I am visiting as a guest
export const getWhoami = () => axios.get("/whoami");

// login using username & password
export const postTokens = ({ username, password }) => {
    return axios.post("/tokens", {
        key: username || '',
        pass: password || ''
    });
}

// create registration
export const postRegistrations = ({ email, password }) => {

    return axios.post("/registrations", {
        email,
        password,
        url: window.location.href
    });
}

// confirm registration
export const postUsers = (payload) => {
    const { confirmation } = payload;
    console.log(confirmation)
    return axios.post("/users", {
        confirmation
    });
}
