import LoginForm from './LoginForm';
import { createActionName, setOK, takeEvery, take, put, createAction } from '../../../common';
import { runSaga, connect2store } from '../../force';
import { newSession } from '../../api';
import { apiSaga, sessionUpdated } from '../../sagas';
import * as session from '../../session';

export const MODULE_NAME = 'loginForm';

export const LOGIN = createActionName("SUBMIT", MODULE_NAME);
export const LOGIN_OK = setOK(LOGIN);

export const login = createAction(LOGIN);

const d2p = { login };

export default connect2store({ d2p, form: MODULE_NAME })(LoginForm);

function* loginListener() {
    yield takeEvery(LOGIN, apiSaga.bind(null, LOGIN, newSession));
}

runSaga(loginListener)

function* onLogin () {
    while (true) {
        const { payload } = yield take(LOGIN_OK);
        yield session.set(payload);
        yield put(sessionUpdated(session.get()));
    }
}

runSaga(onLogin)