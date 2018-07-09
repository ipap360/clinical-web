import Main from './Main';

import { runSaga, history, connect2store, reducerRegistry } from '../..';
import { setFin, createActionName, createAction, take, call, put, takeEvery, setOK } from '../../../common';
import * as session from '../../session';
import { expireSession } from '../../api';
import { apiSaga, SESSION_UPDATED, sessionUpdated } from '../../sagas';

// name
export const MODULE_NAME = 'main';

// action names
export const LOGOUT = createActionName("LOGOUT", MODULE_NAME);
export const LOGOUT_FINISHED = setFin(LOGOUT);

// action creators
// export const fetchSession = createAction(FETCH_SESSION);
export const logout = createAction(LOGOUT);

// initial state
const state0 = { 
    ...session.get(), 
    // loading: false 
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
}

reducerRegistry.register(MODULE_NAME, reducer);

// selectors
export const getIsSignedIn = (state) => state[MODULE_NAME].isSignedIn;

// connect
const s2p = (state) => ({
    isSignedIn: getIsSignedIn(state)
});

const d2p = { logout };

export default connect2store({ s2p, d2p })(Main);

// sagas
function* logoutListener() {
    const { uuid } = session.get();
    yield takeEvery(LOGOUT, apiSaga.bind(null, expireSession, uuid));
}

runSaga(logoutListener());

function* onLogout() {
    while (true) {
        yield take(LOGOUT_FINISHED);
        yield session.clear();
        yield call(history.push, "/");
        yield put(sessionUpdated(session.get()));
    }
}

runSaga(onLogout());

// fix
// function* onSessionFail() {
//     while (true) {
//         yield take(fail(act.WHOAMI));
//         yield session.clear();
//         yield put(sessionUpdated(session.get()));
//     }
// }

// runSaga(onSessionFail());

