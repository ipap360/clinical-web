import * as api from 'api';

const a = (name, fn) => {
    return {
        name,
        fn
    }
};

const b = (from, to) => {
    return {
        from, to
    }
};


//  async actions: entry point (name) -> name_SENT -> api call -> name_SUCCEEDED | name_FAILED
export const async = [
    a("SIGNUP", api.newRegistration),
    a("SIGNUP_CONFIRM", api.confirmRegistrations),
    a("LOGIN", api.newSession),
    a("LOGOUT", api.expireSession),
    a("ENTER", api.getSession),
];

//  run function on action type
export const run = [
    a("LOGIN_SUCCEEDED", (...args) => {
        console.log(args);
    })
];

//  forward a certain action to another
export const fwd = [
    b("STORE_INITIALIZED", "ENTER")
];
