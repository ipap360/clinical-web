import net, { toQueryParams, formErrorHandler } from "./api";

const API_ENDPOINT = "/calendar-events";

// LIST
export const query = ({ from, to, patient }) => {
    return net.get(API_ENDPOINT + toQueryParams({ from, to, patient }));
};

// CRUD
export const view = id =>
    net.get(API_ENDPOINT + "/" + id).catch(formErrorHandler);

export const save = (id = 0, { ...data }) => {
    return net.post(API_ENDPOINT + "/" + id, data).catch(formErrorHandler);
};

export const del = id => net.post(API_ENDPOINT + "/" + id + "/delete");

export const postpone = (id, { ...data }) =>
    net
        .post(API_ENDPOINT + "/" + id + "/postpone", data)
        .catch(formErrorHandler);

export const copy = (id, { ...data }) =>
    net.post(API_ENDPOINT + "/" + id + "/copy", data).catch(formErrorHandler);
