import { fork, call, put, all, take, join, takeEvery, spawn } from 'redux-saga/effects';
import reducerRegistry from '../reducerRegistry';
import { setOK, setFail, setFin, createAction, createActionName } from "../helpers";
import { get as getSession } from "./session";

// module name
export const MODULE_NAME = "SESSION";

// action names
export const SESSION_UPDATED = createActionName("SESSION_UPDATED");
export const GET_SESSION = createActionName("GET_SESSION");
export const LOGIN = createActionName("INSERT_SESSION");
export const LOGOUT = createActionName("DELETE_SESSION");

export const actions = {
    sessionUpdated: createAction(SESSION_UPDATED)
};

export const selectors = {
    getIsSignedIn: (state) => state[MODULE_NAME].name !== null
};

export const sagas = {
    sessionOk: function* () {
        while (true) {
            const { payload } = yield take(setOK(GET_SESSION));
            yield session.set(payload);
            yield put(sessionUpdated(session.get()));
        }
    },
    sessionFail: function* () {
        while (true) {
            const response = yield take(setFail(GET_SESSION));
            // check why did it fail?
            console.log(response);
            // yield session.clear();
            yield put(sessionUpdated(session.get()));
        }
    },
    loginOk: function* () {
        while (true) {
            const { payload } = yield take(setOK(LOGIN));
            yield session.set(payload);
            yield put(sessionUpdated(session.get()));
        }
    },
    logout: function* () {
        while (true) {
            yield take(setFin(LOGOUT));
            yield session.clear();
            yield call(history.push, "/");
            yield put(sessionUpdated(session.get()));
        }        
    }
}

// initial state
const state0 = { ...getSession(), loading: false };

// reducer
const reducer = (state = state0, { type, payload }) => {
    switch (action.type) {
        case SESSION_UPDATED:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}

reducerRegistry.register(MODULE_NAME, reducer);