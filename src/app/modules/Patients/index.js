import { registerSagas, registerReducer } from "../../../common";
import { createActionName, createAction, setOK } from "../../helpers";
import { keyBy } from "../../utils";
import { apiSaga } from "../../session";
import * as api from "../../api/patients";

export const MODULE_NAME = "patients";

export const FETCH_PATIENTS = createActionName("LIST", MODULE_NAME);
export const FETCH_PATIENTS_OK = setOK(FETCH_PATIENTS);

export const fetchPatients = createAction(FETCH_PATIENTS);

const state0 = {
    patients: []
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_PATIENTS_OK:
            return {
                ...state,
                patients: payload
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

// selector
export const getPatients = state => state[MODULE_NAME].patients;
export const getPatientsById = state => {
    return keyBy(getPatients(state), "id");
};

// sagas
function* patientListeners({ takeEvery, takeLatest }) {
    yield takeEvery(FETCH_PATIENTS, apiSaga, api.query);
}

registerSagas(patientListeners);
