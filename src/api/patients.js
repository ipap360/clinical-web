import net, { toQueryParams, formErrorHandler } from "./api";

const API_ENDPOINT = "/patients";

export const query = ({ ...params }) => {
    return net.get(API_ENDPOINT + toQueryParams(params));
};

// CRUD
export const view = id => net.get(API_ENDPOINT + "/" + id);

export const save = ({ id = 0, ...data }) => {
    return net.post(API_ENDPOINT + "/" + id, data).catch(formErrorHandler);
};

export const del = id => net.post(API_ENDPOINT + id + "/delete");
