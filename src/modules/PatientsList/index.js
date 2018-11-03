import { registerSagas, registerReducer } from "redux-dynamic-config";
import { createActionName, createAction, setOK, keyBy } from "../../utils";
import { apiSaga } from "../Session";
import { patients } from "../../api";
import { withStore } from "../../context";

import PatientsList from "./PatientsList";

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

// selectors
export const getPatients = state => state[MODULE_NAME].patients;

export const getPatientsById = state => {
    return keyBy(getPatients(state), "id");
};

// TODO: FIX!!!
export const getGenderInitial = state => patientId => {
    const patient = patientId && getPatientsById(state)[patientId];
    return patient && patient.gender ? patient.gender.toLowerCase()[0] : "";
};

// sagas
function* patientListeners({ takeEvery, takeLatest }) {
    yield takeEvery(FETCH_PATIENTS, apiSaga, patients.query);
}

registerSagas(patientListeners);

const s2p = (state, ownProps) => ({
    // submitSucceeded: hasSubmitSucceeded(MODULE_NAME)(state),
    // TODO: FIX!!!
    // disabledDate: false, // !selector(state, 'patient'),
    // gender: getGender(state)
});

const d2p = {
    fetchPatients
};

export default withStore(s2p, d2p)(PatientsList);
