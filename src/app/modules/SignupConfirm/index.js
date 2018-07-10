import SignupConfirm from './SignupConfirm';

import { connect2store, reducerRegistry, runSaga } from '../../force';
import { createAction, setOK, setFail, createActionName, takeEvery } from '../../../common';
import { apiSaga } from '../../sagas';
import { confirmRegistrations } from '../../api';

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
                message: "Your request is being processed..."
            }
        case SIGNUP_CONFIRMED:
            return {
                ...state,
                loading: false,
                isError: false,
                message: payload.message
            }
        case SIGNUP_REJECTED:
            return {
                ...state,
                loading: false,
                isError: true,
                message: payload.message
            }
        default:
            return state;
    }
}

reducerRegistry.register(MODULE_NAME, reducer);

const s2p = (state) => ({...state[MODULE_NAME]});
const d2p = {
    confirmSignup
};

export default connect2store({s2p, d2p})(SignupConfirm);

// sagas

function* signupConfirmListener () {
    yield takeEvery(SIGNUP_CONFIRM, apiSaga.bind(null, SIGNUP_CONFIRM, confirmRegistrations, ))
}

runSaga(signupConfirmListener);