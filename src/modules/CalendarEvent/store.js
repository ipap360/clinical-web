import { registerReducer } from "redux-dynamic-config";
import { calendarEvents } from "../../api";
import { createAsyncNames, createAsyncAction } from "../../utils";
import moment from "moment";
import { getFormValue, getFormState } from "../FormStateToRedux";
import { getPatientsById } from "../PatientsList";

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

export const getCalendarEventTitle = (state, form) => {
    const patient = getFormValue(state, form, "patient");
    const date = getFormValue(state, form, "date") || "";
    const formattedDate = date ? moment(date).format("dddd DD MMMM") : "";
    const patients = getPatientsById(state);
    const p = patient && patients[patient];
    return p
        ? [p.name, p.code ? `[${p.code}]` : "", formattedDate].join(" ")
        : "";
};

export const getIsPostponed = (state, form) =>
    !!getFormValue(state, form, "isPostponed");

export const getIsCopied = (state, form) =>
    !!getFormValue(state, form, "isCopied");

export const getOriginal = (state, form) => {
    const id = getFormValue(state, form, "postponeId");
    const date = getFormValue(state, form, "originalDate");
    return { id, date };
};

export const getIsMounted = (state, form) => !!getFormState(state, form).values;

export const getIsDisabled = (state, form) => {
    const isPostponed = getIsPostponed(state, form);
    const isCopied = getIsCopied(state, form);
    return isPostponed || isCopied;
};
