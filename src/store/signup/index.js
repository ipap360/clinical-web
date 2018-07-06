import reducerRegistry from '../reducerRegistry';
import { createActionName, createAction } from '../helpers';

// module name
export const MODULE_NAME = 'signup';

export const STATUS = {
    INIT: "INIT",
    EMAIL: "EMAIL",
    CONFIRM: "CONFIRM",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED"
}

// initial state
const state0 = {
    status: STATUS.INIT,
    message: "",
    token: ""
};

// action names
export const SIGNUP = createActionName("SIGNUP", { ns: MODULE_NAME });
export const SIGNUP_CONFIRM = createActionName("SIGNUP_CONFIRM");

// actions
export const actions = {
    confirmSignup: createAction(SIGNUP_CONFIRM)
};

// reducer
const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case SIGNUP_CONFIRM:
            return {
                ...state,
                status: STATUS.CONFIRM,
                message: t("Your request is being processed...")
            }
        case ok(SIGNUP_CONFIRM):
            return {
                ...state,
                status: STATUS.COMPLETED,
                message: payload.message
            }
        case fail(SIGNUP_CONFIRM):
            return {
                ...state,
                status: STATUS.FAILED,
                message: payload.message
            }
        case SIGNUP:
            return {
                ...state,
                status: STATUS.INIT,
                message: ""
            }
        case ok(SIGNUP):
            return {
                ...state,
                status: STATUS.EMAIL,
                message: payload.message
            };
        case fail(SIGNUP):
            return {
                ...state,
                status: STATUS.INIT,
                message: ""
            }
        default:
            return state;
    }
}

reducerRegistry.register(MODULE_NAME, reducer);