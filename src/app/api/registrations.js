import net from "./api";

const API_ENDPOINT = "/registrations";

// sign uuuup
export const insert = ({ email, password, locale, timezone, url }) =>
    net.post(API_ENDPOINT, {
        email,
        password,
        locale,
        timezone,
        url
    });

// confirm registration
export const confirm = ({ token }) =>
    net.post(API_ENDPOINT + "/confirm", {
        token
    });
