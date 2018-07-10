import SignupForm from './SignupForm';

import { runSaga, connect2store, history } from '../../force';
import { apiSaga } from '../../sagas';
import { newRegistration } from '../../api';
import { setOK, createActionName, createAction, takeEvery, take, call } from '../../../common';
import { SIGNUP_EMAIL } from '../paths';

// import { getSession }
export const MODULE_NAME = 'signupForm';

export const SIGNUP = createActionName("SUBMIT", MODULE_NAME);
export const SIGNUP_OK = setOK(SIGNUP);

export const signup = createAction(SIGNUP);

const s2p = (state, ownProps) => ({
    initialValues: {
        timezone: getTimezone(getSession(state)),
        locale: getLocale(getSession(state)),
        url: ownProps.callbackURL
    }
});

const d2p = { signup };

const getSession = (state) => state.session || {};
const getTimezone = (session) => session.timezone;
const getLocale = (session) => session.locale;

export default connect2store({ d2p, s2p, form: MODULE_NAME })(SignupForm);

// sagas
function* signupListener() {
    yield takeEvery(SIGNUP, apiSaga.bind(null, SIGNUP, newRegistration));
}

runSaga(signupListener);

function* onSignup() {
    while (true) {
        yield take(SIGNUP_OK);
        yield call(history.push, SIGNUP_EMAIL);
    }
}

runSaga(onSignup);