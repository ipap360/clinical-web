import net from "./api";

const API_ENDPOINT = "/sessions";

// check whether I have a valid token or if I am visiting as a guest
export const check = ({ uuid = "0" }) => {
    return net.get(API_ENDPOINT + "/" + uuid);
};

// login using username & password
export const login = ({ username, password }) =>
    net.post(API_ENDPOINT, {
        username: username || "",
        password: password || ""
    });

// check whether I have a valid token or if I am visiting as a guest
export const refresh = ({ uuid = "0" }) => {
    return net
        .post(API_ENDPOINT + "/" + uuid + "/refresh")
        .then(response => {
            return response;
        })
        .catch(e => {
            return e;
        });
};

// check whether I have a valid token or if I am visiting as a guest
export const expire = ({ uuid = "0" }) => {
    return net.post(API_ENDPOINT + "/" + uuid + "/expire");
};
