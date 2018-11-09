import { registerReducer } from "redux-dynamic-config";
import { createAsyncNames, createAsyncAction } from "../../utils";
import keyBy from "lodash/keyBy";
import { patients } from "../../api";
import { withStore } from "../../context";

import PatientsList from "./PatientsList";

export const MODULE_NAME = "patients";

export const FETCH_PATIENTS = createAsyncNames("LIST", MODULE_NAME);
export const fetchPatients = createAsyncAction(FETCH_PATIENTS, patients.query);

const state0 = {
    patients: []
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_PATIENTS.OK:
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

export const getGenderInitial = (state, id) => {
    if (!id) return "";

    const patient = getPatientsById(state)[id];
    if (!patient) return "";

    return patient.gender ? patient.gender.toLowerCase()[0] : "";
};

const s2p = (state, ownProps) => ({});

const d2p = {
    fetchPatients
};

export default withStore(s2p, d2p)(PatientsList);
