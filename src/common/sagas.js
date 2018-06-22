import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';
import action, * as actions from './actions';
import * as api from './api';
import * as session from './session';
// import { log } from './utils';

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


// function* auth () {
//     try {
//         yield call();
//     } catch (e) {
//         // console.log(e);
//         yield e;
//     }
// }

// function* reauth() {
//     yield* auth();
// }

function* onReAuth() {
    let task;
    while (true) {
        const msg = yield take(REAUTH_ACTION);
        if (!task) {
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

// function* callEvery(name, fn) {
//     yield takeEvery(name, callSaga.bind(null, fn));
// }

function* onInit() {
    yield take(act.STORE_INIT);
    yield session.setLanguage();
    yield put(action(act.WHOAMI));
}

function* onSessionOk() {
    while (true) {
        const { payload } = yield take(ok(act.WHOAMI));
        yield session.set(payload);
        yield console.log(payload);
    }
}

function* onSessionFail() {
    while (true) {
        yield take(fail(act.WHOAMI));
        yield session.clear();
        yield put(action(act.SESSION_UPDATED, session.get()));
    }
}

function* onLoginOk() {
    while (true) {
        const { payload } = yield take(ok(act.LOGIN));
        yield session.set(payload);
        yield put(action(act.SESSION_UPDATED, session.get()));
    }
}


const sagas = [
    [asyncEvery, act.SIGNUP, api.newRegistration],
    [asyncEvery, act.SIGNUP_CONFIRM, api.confirmRegistrations],
    [asyncEvery, act.LOGIN, api.newSession],
    [asyncEvery, act.LOGOUT, api.expireSession],
    [asyncEvery, act.WHOAMI, api.getSession],
    // [callEvery, ok(act.LOGOUT), (...args) => {
    //     log.debug(this, args);
    //     session.clear();
    // }],
    // [callEvery, fail(act.LOGOUT), (...args) => {
    //     session.clear();
    //     log.debug(this, args);
    // }],
    // [callEvery, act.STORE_INIT, () => {
    //     console.log("call whoami?");
    //     put(action(act.WHOAMI))
    // }]
].map((e) => (e[0].bind(this, e[1], e[2])()));

export default function* () {
    yield all([
        ...sagas,
        onReAuth(),
        onInit(),
        onSessionOk(),
        onSessionFail(),
        onLoginOk(),
    ]);
}