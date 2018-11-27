import { registerReducer } from "redux-dynamic-config";
import { patients } from "../../api";
import { createAsyncNames, createAsyncAction } from "../../utils";
import { getFormValue, getFormState } from "../FormStateToRedux";

const MODULE_NAME = "patient";

export const DELETE = createAsyncNames("DELETE", MODULE_NAME);
export const deletePatient = createAsyncAction(DELETE, patients.del);

export const getPatientTitle = (state, form) => {
    return getFormValue(state, form, "name") || "";
};

export const getIsMounted = (state, form) => !!getFormState(state, form).values;
