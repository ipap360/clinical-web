import net, { toQueryParams, formErrorHandler } from "./api";

const API_ENDPOINT = "/thresholds";

// CRUD
export const query = () => {
    return net.get(API_ENDPOINT);
};

export const view = id =>
    net.get(API_ENDPOINT + "/" + id).catch(formErrorHandler);

export const save = (id = 0, { ...data }) => {
    return net.post(API_ENDPOINT + "/" + id, data).catch(formErrorHandler);
};

export const del = id => net.post(API_ENDPOINT + "/" + id + "/delete");
