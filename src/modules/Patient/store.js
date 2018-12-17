import { registerReducer } from "../../context";
import { patients } from "../../api";
import { createAsyncNames, createAsyncAction } from "../../utils";
import { getFormValue, getFormState } from "../FormStateToRedux";

const MODULE_NAME = "patient";

export const DELETE = createAsyncNames("DELETE", MODULE_NAME);
export const FETCH_EVENTS = createAsyncNames("EVENTS", MODULE_NAME);

export const deletePatient = createAsyncAction(DELETE, patients.del);
export const fetchEvents = createAsyncAction(FETCH_EVENTS, patients.events);

const state0 = { events: [] };

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_EVENTS.OK:
            return {
                ...state,
                events: payload
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const getEvents = state => state[MODULE_NAME].events;

export const getPatientTitle = (state, form) => {
    return getFormValue(state, form, "name") || "";
};

export const getIsMounted = (state, form) => !!getFormState(state, form).values;
