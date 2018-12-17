import { registerReducer } from "../../context";
import {
    createAsyncNames,
    createAsyncAction,
    getQueryParam,
    contains
} from "../../utils";
import keyBy from "lodash/keyBy";
import { patients } from "../../api";

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
export const getPatients = (state, ownProps) =>
    state[MODULE_NAME].patients.filter(e => {
        if (ownProps && ownProps.history) {
            const q = getQueryParam(ownProps.history, "q");
            if (q) {
                const matchName = contains(e.name, q);
                const matchCode = contains(e.code, q);
                const matchNotes = contains(e.notes, q);
                return matchName || matchCode || matchNotes;
            }
        }
        return true;
    });

export const getPatientsById = state => {
    return keyBy(getPatients(state), "id");
};

export const getGenderInitial = (state, id) => {
    if (!id) return "";

    const patient = getPatientsById(state)[id];
    if (!patient) return "";

    return patient.gender ? patient.gender.toLowerCase()[0] : "";
};
