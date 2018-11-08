import net, { SESSIONS_ENDPOINT, formErrorHandler } from "./api";
import cookie from "./cookie";

export const init = cookie.get();

// check whether I have a valid token or if I am visiting as a guest
export const query = () => {
    const { uuid } = cookie.get();
    const id = uuid || "0";
    return net.get(SESSIONS_ENDPOINT + "/" + id);
};

// login using username & password
export const login = ({ username, password }) =>
    net
        .post(SESSIONS_ENDPOINT, {
            username: username || "",
            password: password || ""
        })
        .catch(formErrorHandler);

// check whether I have a valid token or if I am visiting as a guest
export const expire = () => {
    const { uuid } = cookie.get();
    const id = uuid || "0";
    return net.post(SESSIONS_ENDPOINT + "/" + id + "/expire");
};
