import { registerReducer } from "redux-dynamic-config";
import { calendarEvents } from "../../api";
import { createAsyncNames, createAsyncAction } from "../../utils";

const MODULE_NAME = "calendar-events";

export const DELETE = createAsyncNames("DELETE", MODULE_NAME);
export const deleteEvent = createAsyncAction(DELETE, calendarEvents.del);

const state0 = {
    deleting: null,
    deleted: []
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case DELETE._:
            return {
                ...state,
                deleting: payload
            };
        case DELETE.OK:
            return {
                ...state,
                deleted: [...state.deleted, state.deleting]
            };
        case DELETE.ALWAYS:
            return {
                ...state,
                deleting: null
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const getDeleted = state => state[MODULE_NAME].deleted || [];
