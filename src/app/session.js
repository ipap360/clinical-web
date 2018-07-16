import momentTimezone from 'moment-timezone';
import moment from 'moment';
import 'moment/locale/el';
import Cookies from 'js-cookie';
import locale2 from 'locale2';
import { base64 } from './utils';
import { createActionName, createAction, setOK, setFin, setFail } from './helpers';
import { APP_NAME } from './constants';
import { getSession, newSession, refreshSession, expireSession } from './api';
import { fork, call, put, take, join } from 'redux-saga/effects';
import { registerReducer, registerSagas } from '../common';
import history from './history';

const MODULE_NAME = "session";

const SESSION_COOKIE_NAME = 'presence';
const LANG_COOKIE_NAME = 'lang';
const XSRF_COOKIE = "XSRF-TOKEN";

// these are set by the server and are defined only for logout
const REFRESH_TOKEN_COOKIE_NAME = "iu2w";

// default session details based on client's system settings
export const session0 = {
    uuid: "",
    language: locale2,
    locale: locale2,
    name: null,
    timezone: momentTimezone.tz.guess(),
    expiresAt: null
};

// cookie session storage
export const cookie = {
    get: () => {
        let session = Cookies.get(SESSION_COOKIE_NAME);
        if (session) {
            try {
                return { ...session0, ...JSON.parse(base64.decode(session)) };
            } catch (e) {
                console.warn("session cookie parsing failed!", session);
            }
        }

        const lang = Cookies.get(LANG_COOKIE_NAME) || locale2;
        return { ...session0, language: lang, locale: lang };
    },
    set: (obj) => {
        const expires = (obj.expiresAt) ? new Date(obj.expiresAt) : 0;
        Cookies.set(SESSION_COOKIE_NAME, base64.encode(JSON.stringify(obj)), {
            expires
        });
        const lang = obj.language || locale2;
        cookie.setLanguage(lang);
        // Cookies.set(LANG_COOKIE_NAME, lang);
    },
    clear: () => {
        Cookies.remove(SESSION_COOKIE_NAME);
        Cookies.remove(XSRF_COOKIE);
        Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
    },
    setLanguage: (lang = Cookies.get(LANG_COOKIE_NAME)) => {
        const language = lang || locale2;
        Cookies.set(LANG_COOKIE_NAME, language);
        const momentLanguage = language.split("-")[0];
        moment.locale(momentLanguage);
    }
}

// action names
export const FETCH_SESSION = createActionName("FETCH_SESSION");
export const FETCH_SESSION_OK = setOK(FETCH_SESSION);
export const LOGIN = createActionName("SUBMIT", MODULE_NAME);
export const LOGIN_OK = setOK(LOGIN);
export const REFRESH_SESSION = "REFRESH_SESSION";
export const LOGOUT = createActionName("LOGOUT", MODULE_NAME);
export const LOGOUT_FINISHED = setFin(LOGOUT);
export const SESSION_UPDATED = createActionName("SESSION_UPDATED");

// action creators
export const login = createAction(LOGIN);
export const whoami = createAction(FETCH_SESSION);
export const sessionUpdated = createAction(SESSION_UPDATED);
export const logout = (payload) => {
    const { uuid } = cookie.get();
    return {
        type: LOGOUT,
        payload: {
            uuid,
            ...payload
        }
    }
}

// init state
const state0 = {
    ...cookie.get()
};

// reducer
const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case SESSION_UPDATED:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

// selectors
export const getIsSignedIn = (state) => state[MODULE_NAME].name !== null;
export const getName = (state) => state[MODULE_NAME].name || "";

// sagas
function* onInit({ take, put }) {
    yield take(APP_NAME);
    cookie.setLanguage();
    const { uuid } = cookie.get();
    yield put(whoami({ uuid }));
}

function* onSessionOk() {
    while (true) {
        const { payload } = yield take(FETCH_SESSION_OK);
        cookie.set(payload);
        yield put(sessionUpdated(cookie.get()));
    }
}

function* onReAuth() {
    let task;
    while (true) {
        const action = yield take(REFRESH_SESSION);
        if (task === undefined || !task.isRunning()) {
            const { uuid } = cookie.get();
            task = yield fork(refreshSession, { uuid });
        }
        const response = yield join(task);
        if (response.status === 200) {
            yield fork(action.onSuccess);
        } else {
            yield fork(action.onError, response);
        }
    }
}

function* onLoginOk({ take, put }) {
    while (true) {
        const { payload } = yield take(LOGIN_OK);
        cookie.set(payload);
        yield put(sessionUpdated(cookie.get()));
    }
}

function* onAnyLogout({ take, call, put }) {
    while (true) {
        yield take(LOGOUT_FINISHED);
        cookie.clear();
        yield put(sessionUpdated(cookie.get()));
        yield call(history.push, "/");
    }
}

function* sessionListeners({ takeEvery }) {
    yield takeEvery(LOGIN, apiSaga.bind(null, newSession));
    yield takeEvery(FETCH_SESSION, apiSaga.bind(null, getSession));
    yield takeEvery(LOGOUT, apiSaga.bind(null, expireSession));
}

export function* apiSaga(...args) {
    // console.log(args);
    const [fn, { type, payload, meta = {} }] = args;
    // console.log(payload);
    // console.log(meta);
    try {
        const data = yield call(fn, payload);
        yield* okSaga(type, meta.resolve, data);
    } catch (e) {
        if (e.reAuth) {
            yield put({
                type: REFRESH_SESSION,
                onSuccess: apiSaga.bind(null, ...args),
                onError: errorSaga.bind(null, type, meta)
            });
        } else if (e.reLogin) {
            cookie.clear();
            yield put(sessionUpdated(cookie.get()));
        } else {
            yield* errorSaga(type, meta.reject, e);
        }
    }
    yield put({ type: setFin(type) });
}

export function* okSaga(type, resolve, data) {
    // console.log(resolve);
    const ok = setOK(type);
    yield put({ type: ok, payload: data.data });
    if (resolve) yield call(resolve);
}

export function* errorSaga(type, reject, e) {
    // console.log(reject);
    yield put({ type: setFail(type), payload: e.data });
    if (reject) yield call(reject, e);
}

registerSagas(onInit, onReAuth, onSessionOk, onLoginOk, onAnyLogout, sessionListeners);

// fix
// function* onSessionFail() {
//     while (true) {
//         yield take(fail(act.WHOAMI));
//         yield session.clear();
//         yield put(sessionUpdated(session.get()));
//     }
// }

// runSaga(onSessionFail());
