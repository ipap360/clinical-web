import axios from 'axios';
import _ from 'lodash';

export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
};

export const CODE = {
    AUTH: {
        FAILED: -100,
        EXPIRED: -101
    }
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
});

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
            // if (sessionRenewalQueue.length === 0) {
            //     instance.post(process.env.REACT_APP_REFRESH_PATH).then(() => {
            //         onSessionRenewed();
            //     }).catch((e2) => {
            //         onTokenRenewalFailed(e2);
            //     });
            // }
            // return new Promise((resolve, reject) => {
            //     awaitSessionRenewal(() => {
            //         resolve(axios(config));
            //     });
            //     awaitSessionFailure((e2) => {
            //         reject(normalizeError(e2));
            //     });
            // });
        }
    }

    return Promise.reject(normalizeError(error));

});

export default instance;