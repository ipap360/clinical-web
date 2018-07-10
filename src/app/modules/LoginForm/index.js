import LoginForm from './LoginForm';
import { createActionName, setOK, createAction } from '../../helpers';
import { registerSagas, connect2store } from '../../../common';
import { newSession } from '../../api';
import { apiSaga, sessionUpdated } from '../../sagas';
import * as session from '../../session';

export const MODULE_NAME = 'loginForm';

// types
export const LOGIN = createActionName("SUBMIT", MODULE_NAME);
export const LOGIN_OK = setOK(LOGIN);

// action
export const login = createAction(LOGIN);

// sagas
function* loginListener({ takeEvery }) {
    yield takeEvery(LOGIN, apiSaga.bind(null, LOGIN, newSession));
}

function* onLogin({ take, put }) {
    while (true) {
        const { payload } = yield take(LOGIN_OK);
        yield session.set(payload);
        yield put(sessionUpdated(session.get()));
    }
}

registerSagas(loginListener, onLogin);

// connect...
const d2p = { login };

export default connect2store({ d2p, form: MODULE_NAME })(LoginForm);

