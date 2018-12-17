import { calendarEvents } from "../../api";
import { createAsyncNames, createAsyncAction } from "../../utils";
import moment from "moment";
import { getFormValue, getFormState } from "../FormStateToRedux";
import { getPatientsById } from "../PatientsList";

const MODULE_NAME = "calendar-events";

export const DELETE = createAsyncNames("DELETE", MODULE_NAME);

export const deleteEvent = createAsyncAction(DELETE, calendarEvents.del);

export const getCalendarEventTitle = (state, form) => {
    const patient = getPatientId(state, form);
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

export const getPatientId = (state, form) =>
    getFormValue(state, form, "patient");

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
