// helper
export default (type, payload) => ({
    type: type,
    payload
});

// commands
export const get = (type) => "GET_" + type;
export const ins = (type) => "INSERT_" + type;
export const del = (type) => "DELETE_" + type;
export const upd = (type) => "UPDATE_" + type;
export const ups = (type) => "UPSERT_" + type;

export const cp = (type) => "COPY_" + type;
export const mv = (type) => "MOVE_" + type;

// statuses
export const ok = (type) => type + "_OK";
export const fail = (type) => type + "_FAILED";
export const init = (type) => type + "_INITIALIZED";
export const chg = (type) => type + "_CHANGED";
export const fin = (type) => type + "_FINISHED";
export const compl = (type) => type + "_COMPLETED";
export const stop = (type) => type + "_STOPPED";
export const inter = (type) => type + "_INTERRUPTED";

// types
export const STORE = "STORE";
export const STORE_INIT = init(STORE);

export const SIGNUP = "SIGNUP";
export const SIGNUP_CONFIRM = "SIGNUP_CONFIRM";

export const SESSION = "SESSION";
export const LOGIN = ins(SESSION);
export const LOGOUT = del(SESSION);
export const WHOAMI = get(SESSION);

export const REFRESH_SESSION = "REFRESH_" + SESSION;

export const SESSION_UPDATED = chg(SESSION);

export const PERSON = "PERSON";
export const GET_PERSON = get(PERSON);
export const INSERT_PERSON = ins(PERSON);
export const UPDATE_PERSON = upd(PERSON);
export const DELETE_PERSON = del(PERSON);

export const CALENDAR_EVENT = "CALENDAR_EVENT";
export const GET_CALENDAR_EVENT = get(CALENDAR_EVENT);
export const INSERT_CALENDAR_EVENT = ins(CALENDAR_EVENT);
export const UPDATE_CALENDAR_EVENT = upd(CALENDAR_EVENT);
export const DELETE_CALENDAR_EVENT = del(CALENDAR_EVENT);

export const POSTPONE_CALENDAR_EVENT = "POSTPONE_" + CALENDAR_EVENT;
export const COPY_CALENDAR_EVENT = cp(CALENDAR_EVENT);