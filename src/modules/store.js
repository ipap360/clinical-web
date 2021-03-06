import { registerReducer } from "../context";
import { createActionName, createAction } from "../utils";
import { sessions, cookie } from "../api";

export const MODULE_NAME = "app";

export const LOCALE = createActionName("LOCALE", MODULE_NAME);
export const NOTIFY = createActionName("NOTIFY", MODULE_NAME);
export const STOP_NOTIFY = createActionName("STOP_NOTIFY", MODULE_NAME);
export const EXIT_NOTIFY = createActionName("EXIT_NOTIFY", MODULE_NAME);

export const setLocale = payload => {
    cookie.setLanguage(payload);
    return {
        type: LOCALE,
        payload
    };
};

export const notify = createAction(NOTIFY);
export const stopNotify = createAction(STOP_NOTIFY);
export const rmNotify = createAction(EXIT_NOTIFY);

const state0 = {
    notification: {
        open: false
    },
    locale: sessions.init.locale
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case LOCALE:
            return {
                ...state,
                locale: payload
            };
        case NOTIFY:
            return {
                ...state,
                notification: {
                    ...payload,
                    open: !!payload.message
                }
            };
        case STOP_NOTIFY:
            return {
                ...state,
                notification: {
                    ...state.notification,
                    open: false
                }
            };
        case EXIT_NOTIFY:
            return {
                ...state,
                notification: {
                    open: false
                }
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const getNotification = (state, ownProps) =>
    state[MODULE_NAME].notification;

export const getLocale = (state, ownProps) => state[MODULE_NAME].locale;
