import axios from "axios";
import cookie from "./cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";
const URL_SUFFIX = process.env.REACT_APP_API_CONTEXT || "/api/v1";
const URL = BASE_URL + URL_SUFFIX || URL_SUFFIX;

const HTTP_STATUS = {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    GATEWAY_TIMEOUT: 504,
};

const API_STATUS = -101;

const net = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        common: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    },
});

export default net;

export const SESSIONS_ENDPOINT = "/sessions";

let RequestsQueue = [];
const refresh = () => {
    const { uuid } = cookie.get();
    const id = uuid || "0";
    return net
        .post(SESSIONS_ENDPOINT + "/" + id + "/refresh")
        .then(response => {
            RequestsQueue.forEach(({ resolve, config }) => {
                const retry = { ...config, baseURL: "" };
                resolve(net(retry));
            });
        })
        .catch(error => {
            RequestsQueue.forEach(({ reject }) => {
                reject(error);
            });
        })
        .then(function() {
            RequestsQueue = [];
        });
};

const normalizeError = error => {
    const { response } = error;
    const re = { reLogin: false, reAuth: false };
    if (response) {
        const { status, data, statusText } = response;
        const noAuth = status === HTTP_STATUS.NOT_AUTHORIZED;
        const reAuth = noAuth && data.code === API_STATUS;
        if (typeof data === "object") {
            return {
                ...response,
                reAuth,
                reLogin: noAuth && !reAuth,
            };
        }
        return {
            ...response,
            data: { message: statusText },
            ...re,
            reLogin: noAuth,
        };
    }
    const message = error.message || error;
    return { status: null, statusText: message, data: { message }, ...re };
};

const isSessionEndpoint = config => {
    const { url } = config;
    return url.startsWith(URL + SESSIONS_ENDPOINT);
};

const isLogout = config => {
    const { url } = config;
    return isSessionEndpoint(config) && url.endsWith("/expire");
};

// const isRefresh = config => {
//     const { url } = config;
//     return isSessionEndpoint(config) && url.endsWith("/refresh");
// };

export const addAuthInterceptor = ({ onSessionUpdated, onStatusUnknown }) => {
    const __onSessionUpdated = function() {
        const ref = this;
        setTimeout(function() {
            if (typeof onSessionUpdated === "function") {
                onSessionUpdated.apply(ref, [cookie.get()]);
            }
        }, 0);
    };

    net.interceptors.response.use(
        function(response) {
            // eslint-disable-next-line
            const { data, status, statusText, config } = response;

            if (isSessionEndpoint(config)) {
                if (isLogout(config)) {
                    cookie.clear();
                } else {
                    cookie.set(data);
                }
                __onSessionUpdated.apply(this);
            }

            return data;
        },
        function(error) {
            const { config, response } = error;
            const { reAuth, reLogin, data } = normalizeError(error);
            if (reAuth) {
                if (RequestsQueue.length === 0) {
                    refresh();
                }
                return new Promise((resolve, reject) => {
                    RequestsQueue.push({
                        config,
                        resolve,
                        reject,
                    });
                });
            }
            if (reLogin) {
                cookie.clear();
                __onSessionUpdated.apply(this);
            }
            if (
                response === undefined ||
                response.status === HTTP_STATUS.GATEWAY_TIMEOUT
            ) {
                if (typeof onStatusUnknown === "function") {
                    const retry = { ...config, baseURL: "" };
                    onStatusUnknown(net.bind(null, retry));
                }
            }
            return Promise.reject(data);
        }
    );
};

export const formErrorHandler = data => {
    // eslint-disable-next-line
    throw { ...data };
};

export const toQueryParams = (json = {}) => {
    const keys = Object.keys(json);
    return keys.length === 0
        ? ""
        : "?" +
              keys
                  .filter(key => json[key] !== undefined)
                  .map(function(key) {
                      return (
                          encodeURIComponent(key) +
                          "=" +
                          encodeURIComponent(json[key])
                      );
                  })
                  .join("&");
};
