import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';
import name from './name';
import { runSaga } from './force';
import { getSession, refreshSession } from './api';
import * as session from './session';

// import { history, actions } from '../store';
import { setOK, setFail, setFin, createActionName, createAction } from '../common';

// action names
export const FETCH_SESSION = createActionName("FETCH_SESSION");
export const FETCH_SESSION_OK = setOK(FETCH_SESSION);

export const SESSION_UPDATED = createActionName("SESSION_UPDATED");
export const REFRESH_SESSION = "REFRESH_SESSION";

// action creators
export const fetchSession = createAction(FETCH_SESSION);
export const sessionUpdated = createAction(SESSION_UPDATED);

// sagas
function* onInit() {
    yield take(name);
    yield session.setLanguage();
    yield put(fetchSession());
}

console.log(runSaga);

runSaga(onInit);

function* fetchSessionListener() {
    const { uuid } = session.get();
    yield takeEvery(FETCH_SESSION, apiSaga.bind(null, getSession, uuid));
}

runSaga(fetchSessionListener);

function* onSessionOk() {
    while (true) {
        const { payload } = yield take(FETCH_SESSION_OK);
        yield session.set(payload);
        yield put(sessionUpdated(session.get()));
    }
}

runSaga(onSessionOk);

function* onReAuth() {
    let task;
    while (true) {
        const msg = yield take(REFRESH_SESSION);
        if (task === undefined || !task.isRunning()) {
            task = yield fork(refreshSession);
        }
        const response = yield join(task);
        if (response.status === 200) {
            yield fork(msg.payload);
        } else {
            yield* errorSaga(msg.name, msg.reject, response);
        }
    }
}

runSaga(onReAuth);

export function* apiSaga(...args) {

    const { name, fn, data: { payload, resolve, reject } } = args;

    const ok = setOK(name);
    const fin = setFin(name);
    try {
        const data = yield call(fn, payload);
        yield put({ type: ok, payload: data.data });
        if (resolve) yield call(resolve);
    } catch (e) {
        if (e.reAuth) {
            yield put({
                type: REFRESH_SESSION,
                payload: apiSaga.bind(...args)
            });
        } else if (e.reLogin) {
            yield session.clear();
            yield put(sessionUpdated(session.get()));
        } else {
            yield* errorSaga(name, reject, e);
        }
    }
    yield put({ type: fin });
}

export function* errorSaga(name, reject, e) {
    yield put({ type: setFail(name), payload: e.data });
    if (reject) yield call(reject, e);
}

// const asyncSagas = [
//     [act.SIGNUP, api.newRegistration],
//     [act.SIGNUP_CONFIRM, api.confirmRegistrations],
//     // [act.LOGIN, api.newSession],
//     // [act.LOGOUT, api.expireSession],
//     // [act.WHOAMI, api.getSession],
//     // [act.PERSON, api.savePerson],
// ].map((e) => (asyncEvery.bind(this, e[0], e[1])()));

export default function* () {
    yield all([
        // ...asyncSagas,
        // onReAuth(),
        // onInit(),
        // onSessionOk(),
        // onSessionFail(),
        // onLoginOk(),
        // onLogout(),
        // onPersonCreated()
    ]);
}