// import { takeEvery } from 'redux-saga';
import { fork, call, put, all, takeEvery } from 'redux-saga/effects';
import * as api from 'api';

function* getSession() {
    try {
        yield put({ type: "SESSION_DETAILS_REQUESTED"});
        const data = yield call(api.getSession);
        yield put({ type: "SESSION_DETAILS_OK", payload: data.data });    
    } catch (e) {
        yield put({ type: "SESSION_DETAILS_FAILED", payload: e.data });
    }
}

function* initStoreListener() {
    yield takeEvery("STORE_INITIALIZED", getSession);
}

function* newSession({ payload, resolve, reject }) {
    try {
        const data = yield call(api.postTokens, payload);
        yield put({ type: "SESSION_CREATED", payload: data.data });
        yield call(resolve);
    } catch (e) {
        yield put({ type: "SESSION_CREATION_FAILED", payload: e.data });
        yield call(reject, e);
    }
}

function* requestTokenListener() {
    yield takeEvery("SESSION_CREATION_REQUESTED", newSession);
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