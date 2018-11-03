import {
    createActionName,
    createAction,
    setOK,
    setFin,
    setFail
} from "../../utils";
import { sessions } from "../../api";

import { fork, call, put, take, join } from "redux-saga/effects";
import { registerReducer, registerSagas } from "redux-dynamic-config";
import cookie from "./cookie";

import createHistory from "history/createBrowserHistory";

const history = createHistory();

const MODULE_NAME = "session";

// action names
export const FETCH_SESSION = createActionName("FETCH_SESSION");
export const FETCH_SESSION_OK = setOK(FETCH_SESSION);

export const REFRESH_SESSION = "REFRESH_SESSION";

export const LOGOUT = createActionName("LOGOUT", MODULE_NAME);
export const LOGOUT_FINISHED = setFin(LOGOUT);

export const SESSION_UPDATED = createActionName("SESSION_UPDATED");

// action creators
// export const login = createAction(LOGIN);
export const whoami = createAction(FETCH_SESSION);
export const sessionUpdated = () => {
    return {
        type: SESSION_UPDATED,
        payload: cookie.get()
    };
};
export const logout = payload => {
    const { uuid } = cookie.get();
    return {
        type: LOGOUT,
        payload: {
            uuid,
            ...payload
        }
    };
};

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
};

registerReducer(MODULE_NAME, reducer);

// selectors
export const getIsSignedIn = state => state[MODULE_NAME].name !== null;
export const getName = state => state[MODULE_NAME].name || "";

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
        yield put(sessionUpdated());
    }
}

function* onRefreshSession() {
    let task;
    while (true) {
        const action = yield take(REFRESH_SESSION);
        if (task === undefined || !task.isRunning()) {
            const { uuid } = cookie.get();
            task = yield fork(api.refresh, { uuid });
        }
        yield fork(joinTask, task, action);
    }
}

function* joinTask(task, action) {
    const response = yield join(task);
    if (response.status === 200) {
        yield fork(action.onSuccess);
    } else {
        yield fork(action.onError, response);
    }
}

function* onLoginOk({ take, put }) {
    while (true) {
        const { payload } = yield take(LOGIN_OK);
        cookie.set(payload);
        yield put(sessionUpdated());
    }
}

function* onAnyLogout({ take, call, put }) {
    while (true) {
        yield take(LOGOUT_FINISHED);
        cookie.clear();
        yield put(sessionUpdated());
        yield call(history.push, "/");
    }
}

function* sessionListeners({ takeEvery }) {
    // yield takeEvery(LOGIN, apiSaga, sessions.login);
    yield takeEvery(FETCH_SESSION, apiSaga, sessions.check);
    yield takeEvery(LOGOUT, apiSaga, sessions.expire);
}

function* okSaga(type, meta, data) {
    const ok = setOK(type);
    yield put({ type: ok, payload: data.data, meta });
    if (meta.resolve) yield call(meta.resolve, data.data);
}

function* errorSaga(type, meta, e) {
    // console.log(type, meta, JSON.stringify(e));
    if (e.reLogin) {
        // console.log("re-login - clear cookies");
        cookie.clear();
        yield put(sessionUpdated());
    } else {
        // console.log("just error - do not clear session data");
        yield put({ type: setFail(type), payload: e.data });
        if (meta.reject) yield call(meta.reject, e);
    }
}

export function* apiSaga(...args) {
    const [fn, { type, payload, meta = {} }] = args;
    try {
        const data = yield call(fn, payload);
        yield* okSaga(type, meta, data);
    } catch (e) {
        if (e.reAuth) {
            yield put({
                type: REFRESH_SESSION,
                onSuccess: apiSaga.bind(null, ...args),
                onError: errorSaga.bind(null, type, meta)
            });
            return;
        }
        yield* errorSaga(type, meta, e);
    }
    yield put({ type: setFin(type) });
}

registerSagas(
    onInit,
    onRefreshSession,
    onSessionOk,
    onLoginOk,
    onAnyLogout,
    sessionListeners
);

// fix
// function* onSessionFail() {
//     while (true) {
//         yield take(fail(act.WHOAMI));
//         yield session.clear();
//         yield put(sessionUpdated(session.get()));
//     }
// }

// runSaga(onSessionFail());
