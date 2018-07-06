import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';

import * as api from './api';
import * as session from './session';

import { history, actions } from '../store';


const { ok, fail, fin, ...act } = actions;

// export const takeFirst = (pattern, saga, ...args) => fork(function* () {
//     let firstTask;
//     while (true) {
//         const action = yield take(pattern);
//         if (!firstTask) {
//             firstTask = yield spawn(saga, ...args.concat(action));
//         }
//         yield join(firstTask);
//     }
// });

const REAUTH_ACTION = "REFRESH_AUTHENTICATION";

const sessionUpdated = (session) => action(act.SESSION_UPDATED, session);

function* onReAuth() {
    let task;
    while (true) {
        const msg = yield take(REAUTH_ACTION);
        // console.log(task);
        if (task === undefined || !task.isRunning()) {
            task = yield fork(api.refreshSession);
        }
        const response = yield join(task);
        const { name, fn, payload, resolve, reject } = msg.payload;
        if (response.status === 200) {
            yield fork(asyncSaga, name, fn, {
                payload,
                resolve,
                reject
            });
        } else {
            yield put(action(fail(name), response.data));
            if (reject) yield call(reject, response);
            yield put(action(fin(name)));
        }
    }
}

export function* asyncSaga(name, fn, { payload, resolve, reject }) {
    try {
        const data = yield call(fn, payload);
        yield put(action(ok(name), data.data));
        if (resolve) yield call(resolve);
        yield put(action(fin(name)));
    } catch (e) {
        // console.log(e);
        // console.log(api.AUTH_EXPIRED);
        if (e.data && e.data.code === api.AUTH_EXPIRED) {
            yield put(action(REAUTH_ACTION, {
                name,
                fn,
                payload,
                resolve,
                reject
            }));
        } else {
            // console.log("here");
            yield put(action(fail(name), e.data));
            if (reject) yield call(reject, e);
            yield put(action(fin(name)));
        }
    }
}

// function* callSaga(fn, payload = {}) {
//     yield call(fn, payload);
// }

function* asyncEvery(name, fn) {
    yield takeEvery(name, asyncSaga.bind(null, name, fn));
}

function* onInit() {
    yield take(act.STORE_INIT);
    yield session.setLanguage();
    yield put(action(act.WHOAMI));
}

function* onSessionOk() {
    while (true) {
        const { payload } = yield take(ok(act.WHOAMI));
        yield session.set(payload);
        yield put(sessionUpdated(session.get()));
    }
}

function* onSessionFail() {
    while (true) {
        yield take(fail(act.WHOAMI));
        yield session.clear();
        yield put(sessionUpdated(session.get()));
    }
}

function* onLoginOk() {
    while (true) {
        const { payload } = yield take(ok(act.LOGIN));
        yield session.set(payload);
        yield put(sessionUpdated(session.get()));
    }
}

function* onLogout() {
    while (true) {
        yield take(fin(act.LOGOUT));
        yield session.clear();
        yield call(history.push, "/");
        yield put(sessionUpdated(session.get()));
    }
}

function* onPersonCreated() {
    // should run only when we are creating a new event
    while (true) {
        const { payload } = yield take(ok(act.INSERT_PERSON));
        yield console.log(payload);
        yield put(action(act.SELECT_PERSON, payload));
    }
}

const asyncSagas = [
    [act.SIGNUP, api.newRegistration],
    [act.SIGNUP_CONFIRM, api.confirmRegistrations],
    [act.LOGIN, api.newSession],
    [act.LOGOUT, api.expireSession],
    [act.WHOAMI, api.getSession],
    [act.PERSON, api.savePerson],
].map((e) => (asyncEvery.bind(this, e[0], e[1])()));

export default function* () {
    yield all([
        ...asyncSagas,
        onReAuth(),
        onInit(),
        onSessionOk(),
        onSessionFail(),
        onLoginOk(),
        onLogout(),
        onPersonCreated()
    ]);
}