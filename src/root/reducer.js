import { combineReducers } from 'redux';

import * as act from 'common/actions';
import { get as getSession } from 'common/session';

import { reducer as form } from 'redux-form';
import { reducer as registration } from 'registration';
import { reducer as app } from 'app';

const { fin } = act;

const state0 = { ...getSession(), loading: false };
const session = (state = state0, action) => {
    switch (action.type) {
        case act.SESSION_UPDATED:
            return {
                ...state,
                ...action.payload
            };
        case act.WHOAMI:
        case act.LOGIN:
        case act.LOGOUT:
            return {
                ...state,
                loading: true,
            };
        case fin(act.WHOAMI):
        case fin(act.LOGIN):
        case fin(act.LOGOUT):
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default combineReducers({
    form,
    session,
    app,
    registration,
    // routing: routerReducer
});
