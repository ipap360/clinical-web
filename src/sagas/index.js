// import { takeEvery } from 'redux-saga';
import { fork, call, put, all, takeEvery } from 'redux-saga/effects';
import * as api from 'api';

function* getWhoami() {
    try {
        yield put({ type: "CLIENT_IDENTIFICATION_REQUESTED"});
        const data = yield call(api.getWhoami);
        yield put({ type: "CLIENT_IDENTIFIED", payload: data.data });
        // yield call(resolve);
    } catch (e) {
        // console.log(e);
        yield put({ type: "CLIENT_IDENTIFICATION_FAILED", payload: e.data });
        // yield call(reject, e.message);
    }
}

function* initStoreListener() {
    yield takeEvery("STORE_INITIALIZED", getWhoami);
}

function* acquireRefreshToken({ payload, resolve, reject }) {
    try {
        const data = yield call(api.postTokens, payload);
        yield put({ type: "REFRESH_TOKEN_ACQUIRED", payload: data.data });
        yield call(resolve);
    } catch (e) {
        yield put({ type: "REFRESH_TOKEN_ACQUISITION_FAILED", payload: e.data });
        yield call(reject, e);
    }
}

function* requestTokenListener() {
    yield takeEvery("REFRESH_TOKEN_REQUESTED", acquireRefreshToken);
}

function* signUp({ payload, resolve, reject }) {
    try {
        const data = yield call(api.postRegistrations, payload);
        yield put({ type: "SIGNUP_COMPLETED", payload: data.data });
        yield call(resolve);
    } catch (e) {
        yield put({ type: "SIGNUP_FAILED", payload: e.data });
        yield call(reject, e);
    }
}

function* requestSignUpListener() {
    yield takeEvery("SIGNUP_REQUESTED", signUp);
}

function* confirmRegistration(payload) {
    try {
        const data = yield call(api.postUsers, payload);
        yield put({ type: "CONFIRM_REGISTRATION_COMPLETED", payload: data.data });
    } catch (e) {
        yield put({ type: "CONFIRM_REGISTRATION_FAILED", payload: e.data });
    }
}

function* confirmRegistrationListener() {
    yield takeEvery("CONFIRM_REGISTRATION_INITIALIZED", confirmRegistration);
}

export default function* sagas() {
    yield all([
        initStoreListener(),
        requestTokenListener(),
        requestSignUpListener(),
        confirmRegistrationListener()
    ]);
}