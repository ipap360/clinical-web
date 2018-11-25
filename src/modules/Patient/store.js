import { registerReducer } from "redux-dynamic-config";
import { patients } from "../../api";
import { createAsyncNames, createAsyncAction } from "../../utils";
import { getFormValue, getFormState } from "../FormStateToRedux";

const MODULE_NAME = "patient";

export const DELETE = createAsyncNames("DELETE", MODULE_NAME);
export const deletePatient = createAsyncAction(DELETE, patients.del);

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

export const getPatientTitle = (state, form) => {
    return getFormValue(state, form, "name") || "";
};

export const getIsMounted = (state, form) => !!getFormState(state, form).values;
