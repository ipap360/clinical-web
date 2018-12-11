import net, { formErrorHandler } from "./api";

const API_ENDPOINT = "/profile";

export const view = () => net.get(API_ENDPOINT).catch(formErrorHandler);

export const save = ({ ...data }) => {
    return net.post(API_ENDPOINT, data).catch(formErrorHandler);
};

export const updatePwd = ({ ...data }) => {
    return net.post(API_ENDPOINT + "/password", data).catch(formErrorHandler);
};
