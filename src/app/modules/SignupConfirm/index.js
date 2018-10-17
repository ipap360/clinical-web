import SignupConfirm from './SignupConfirm';

import { createAction, setOK, setFail, createActionName } from '../../helpers';
import * as api from '../../api/registrations';
import { registerReducer, registerSagas, connect2store } from '../../../common';
import { apiSaga } from '../../session';

export const MODULE_NAME = 'signupConfirm';

export const SIGNUP_CONFIRM = createActionName("POST", MODULE_NAME);
export const SIGNUP_CONFIRMED = setOK(SIGNUP_CONFIRM);
export const SIGNUP_REJECTED = setFail(SIGNUP_CONFIRM);
// export const SIGNUP_CONFIRM_FINISHED = setFin(SIGNUP_CONFIRM);

// actions
export const confirmSignup = createAction(SIGNUP_CONFIRM)

const state0 = {
    loading: false,
    isError: false,
    isDone: false,
    message: null
};

// reducer
const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case SIGNUP_CONFIRM:
            return {
                ...state,
                loading: true,
                isError: false,
                isDone: false,
                message: "Your request is being processed..."
            }
        case SIGNUP_CONFIRMED:
            return {
                ...state,
                loading: false,
                isError: false,
                isDone: true,
                message: payload.message
            }
        case SIGNUP_REJECTED:
            return {
                ...state,
                loading: false,
                isError: true,
                isDone: false,
                message: payload.message
            }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

// sagas
function* signupConfirmListener({ takeEvery }) {
    yield takeEvery(SIGNUP_CONFIRM, apiSaga, api.confirm)
}

registerSagas(signupConfirmListener);

const s2p = (state) => ({ ...state[MODULE_NAME] });
const d2p = {
    confirmSignup
};

export default connect2store({ s2p, d2p })(SignupConfirm);

