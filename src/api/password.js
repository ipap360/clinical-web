import net, { formErrorHandler } from "./api";

const API_ENDPOINT = "/password";

export const forgot = ({ ...data }) => {
    return net.post(API_ENDPOINT + "/forgot", data).catch(formErrorHandler);
};

export const reset = ({ ...data }) => {
    return net.post(API_ENDPOINT + "/reset", data).catch(formErrorHandler);
};

export const cancel = ({ ...data }) => {
    return net.post(API_ENDPOINT + "/cancel", data).catch(formErrorHandler);
};
