import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';
// import action, * as actions from './actions';
import * as api from '../api';
import * as session from './session';
import history from './history';
import { setOK, setFin, setFail } from './helpers';

const putOK = (name) => (payload) => put({ type: setOK(name), payload });
const putFail = (name) => (payload) => put({ type: setFail(name), payload });
const putFin = (name) => (payload) => put({ type: setFin(name), payload });

const REAUTH_ACTION = "REFRESH_AUTHENTICATION";

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
        const response = yield call(fn, payload);
        yield put(action(ok(name), response.data));
        if (resolve) yield call(resolve);
        yield put(action(fin(name)));
    } catch (error) {
        // console.log(e);
        // console.log(api.AUTH_EXPIRED);
        if (error.data && error.data.code === api.AUTH_EXPIRED) {
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


function* onInit() {
    yield take(act.STORE_INIT);
    yield session.setLanguage();
    yield put(action(act.WHOAMI));
}



// mipws apla reducer?
// function* onPersonCreated() {
//     // should run only when we are creating a new event
//     while (true) {
//         const { payload } = yield take(ok(act.INSERT_PERSON));
//         yield console.log(payload);
//         yield put(action(act.SELECT_PERSON, payload));
//     }
// }

function* asyncEvery(name, fn) {
    yield takeEvery(name, asyncSaga.bind(null, name, fn));
}

const asyncEveryMap = [
    [act.SIGNUP, api.newRegistration],
    [act.SIGNUP_CONFIRM, api.confirmRegistrations],
    [act.LOGIN, api.newSession],
    [act.LOGOUT, api.expireSession],
    [act.WHOAMI, api.getSession],
    [act.PERSON, api.savePerson],
].map((e) => (asyncEvery.bind(this, e[0], e[1])()));

// function* asyncLatest(name, fn) {
//     yield takeEvery(name, asyncSaga.bind(null, name, fn));
// }

// const asyncLatestMap = [
//     [act.SIGNUP, api.newRegistration],
//     [act.SIGNUP_CONFIRM, api.confirmRegistrations],
//     [act.LOGIN, api.newSession],
//     [act.LOGOUT, api.expireSession],
//     [act.WHOAMI, api.getSession],
//     [act.PERSON, api.savePerson],
// ].map((e) => (asyncEvery.bind(this, e[0], e[1])()));

export default function* () {
    yield all([
        ...asyncEveryMap,
        onReAuth(),
        onInit(),
        onSessionOk(),
        onSessionFail(),
        onLoginOk(),
        onLogout(),
        onPersonCreated()
    ]);
}