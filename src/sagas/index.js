import { fork, call, put, all, takeEvery } from 'redux-saga/effects';
import { async, fwd, run } from 'actions';

function act(type, payload = {}) {
    return { type, payload }
}

function* sendAction({ name, fn }, { payload, resolve, reject }) {
    try {
        yield put(act(name + "_SENT"));
        const data = yield call(fn, payload);
        yield put(act(name + "_SUCCEEDED", data.data));
        if (resolve) yield call(resolve);
    } catch (e) {
        yield put(act(name + "_FAILED", e.data));
        if (reject) yield call(reject, e);
    }
}

function* forwardTo(to, payload = {}) {
    yield put(act(to, ...payload));
}

function* callFn(fn, payload = {}) {
    yield call(fn, payload);
}

function* listener(name, generator) {
    yield takeEvery(name, generator);
}

let monitored = [];
for (const v of async) {
    monitored.push(listener.bind(null, v.name, sendAction.bind(null, v))());
}

for (const v of fwd) {
    monitored.push(listener.bind(null, v.from, forwardTo.bind(null, v.to))());
}

for (const v of run) {
    monitored.push(listener.bind(null, v.name, callFn.bind(null, v.fn))());
}

export default function* sagas() {
    yield all(monitored);
}