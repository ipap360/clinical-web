import CalendarEventForm from './CalendarEventForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import * as api from '../../api/calendar-events';
import { apiSaga } from '../../session';

import {
    change as setFormValue,
    // hasSubmitSucceeded,
    formValueSelector
} from 'redux-form';

import { fetchPatients, getPatients, getPatientsById } from '../Patients';

export const MODULE_NAME = 'calendarEventForm';

export const CLEAR_CALENDAR_EVENT = createActionName("CLEAR", MODULE_NAME);

export const LOAD_CALENDAR_EVENT = createActionName("LOAD", MODULE_NAME);
export const LOAD_CALENDAR_EVENT_OK = setOK(LOAD_CALENDAR_EVENT);

export const SAVE_CALENDAR_EVENT = createActionName("SAVE", MODULE_NAME);
export const SAVE_CALENDAR_EVENT_OK = setOK(SAVE_CALENDAR_EVENT);

export const clearCalendarEvent = createAction(CLEAR_CALENDAR_EVENT);
export const loadCalendarEvent = createAction(LOAD_CALENDAR_EVENT);
export const saveCalendarEvent = createAction(SAVE_CALENDAR_EVENT);

export const setPatient = (value) => {
    const set = setFormValue.bind(null, MODULE_NAME, "patient");
    return set(value);
};

const state0 = {
    initialValues: {},
    hasPerson: false
}

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case CLEAR_CALENDAR_EVENT:
            return { ...state, initialValues: {} }
        case LOAD_CALENDAR_EVENT_OK:
            return { ...state, initialValues: payload }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);


export const getInitialValues = (state) => {
    return {
        ...state[MODULE_NAME].initialValues,
    }
};

export const getCalendarEventTitle = (state) => (isNew) => {
    if (isNew) return "New Calendar Event";
    
     const { patient } = getInitialValues(state);
     const patients = getPatientsById(state);
     const p = patient && patients[patient];
     return (p) ? [p.name, p.code].join(" ") : "";
};

const selector = formValueSelector(MODULE_NAME);

const getGender = (state) => {
    const patient = selector(state, 'patient');
    const patients = getPatientsById(state);
    const p = patient && patients[patient];
    return (p && p.gender) ? p.gender.toLowerCase()[0] : "";
}

const s2p = (state, ownProps) => ({
    initialValues: {
        ...getInitialValues(state),
        ...ownProps.initialValues
    },
    patientOptions: getPatients(state).map(p => ({
        value: p.id,
        label: [p.name, p.code, p.notes].join(" ")
    })),
    // submitSucceeded: hasSubmitSucceeded(MODULE_NAME)(state),
    disabledDate: !selector(state, 'patient'),
    gender: getGender(state)
});

const d2p = {
    submitActionCreator: saveCalendarEvent,
    loadCalendarEvent,
    clearCalendarEvent,
    fetchPatients
};

export default connect2store({ s2p, d2p, form: MODULE_NAME })(CalendarEventForm);

// sagas
function* calendarEventFormListeners({ takeEvery, takeLatest }) {
    yield takeEvery(LOAD_CALENDAR_EVENT, apiSaga, api.view);
    yield takeEvery(SAVE_CALENDAR_EVENT, apiSaga, api.save);
}

registerSagas(calendarEventFormListeners);