import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';
import { registerSagas } from '../common';
import { getSession, refreshSession } from './api';
import * as session from './session';
import { APP_NAME } from './constants';

// import { history, actions } from '../store';
import { setOK, setFail, setFin, createActionName, createAction } from './helpers';

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
    yield take(APP_NAME);
    yield session.setLanguage();
    yield put(fetchSession());
}

function* fetchSessionListener() {
    const { uuid } = session.get();
    yield takeEvery(FETCH_SESSION, apiSaga.bind(null, FETCH_SESSION, getSession, uuid));
}

function* onSessionOk() {
    while (true) {
        const { payload } = yield take(FETCH_SESSION_OK);
        yield session.set(payload);
        yield put(sessionUpdated(session.get()));
    }
}

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

registerSagas(onInit, fetchSessionListener, onSessionOk, onReAuth)

export function* apiSaga(...args) {

    console.log(args);

    const [ name, fn, data = {}] = args;
    const { payload, resolve, reject } = data;

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
                payload: apiSaga.bind(null, ...args)
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