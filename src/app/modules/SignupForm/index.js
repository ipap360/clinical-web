import SignupForm from './SignupForm';

import { registerSagas, connect2store } from '../../../common';
import { apiSaga } from '../../session';
import { newRegistration } from '../../api';
import { setOK, createActionName, createAction } from '../../helpers';
import { SIGNUP_EMAIL, SIGNUP_CONFIRM } from '../paths';
import history from '../../history';

// import { getSession }
export const MODULE_NAME = 'signupForm';

export const SIGNUP = createActionName("SUBMIT", MODULE_NAME);
export const SIGNUP_OK = setOK(SIGNUP);

export const signup = createAction(SIGNUP);

const s2p = (state, ownProps) => ({
    initialValues: {
        timezone: getTimezone(getSession(state)),
        locale: getLocale(getSession(state)),
        url: window.location.origin + SIGNUP_CONFIRM
    }
});

// sagas
function* signupListener({ takeEvery }) {
    yield takeEvery(SIGNUP, apiSaga.bind(null, newRegistration));
}

function* onSignup({ take, call }) {
    while (true) {
        yield take(SIGNUP_OK);
        yield call(history.push, SIGNUP_EMAIL);
    }
}

registerSagas(signupListener, onSignup);

// connect..
const d2p = { submitActionCreator: signup };

const getSession = (state) => state.session || {};
const getTimezone = (session) => session.timezone;
const getLocale = (session) => session.locale;

export default connect2store({ d2p, s2p, form: MODULE_NAME })(SignupForm);

