import CalendarEventForm from './CalendarEventForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { upsertCalendarEvent, getPersons, roomAvailability, viewCalendarEvent } from '../../api';
import { apiSaga } from '../../session';
// import { formValueSelector } from 'redux-form';
import {
    change as setFormValue,
    hasSubmitSucceeded,
    formValueSelector
} from 'redux-form';

// import moment from 'moment';

export const MODULE_NAME = 'calendarEventForm';

export const FETCH_PERSONS = createActionName("LIST_PERSONS", MODULE_NAME);
export const FETCH_PERSONS_OK = setOK(FETCH_PERSONS);

// export const FETCH_AVAILABILITY = createActionName("FETCH_AVAILABILITY", MODULE_NAME);
// export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);

export const CLEAR_CALENDAR_EVENT = createActionName("CLEAR", MODULE_NAME);

export const LOAD_CALENDAR_EVENT = createActionName("LOAD", MODULE_NAME);
export const LOAD_CALENDAR_EVENT_OK = setOK(LOAD_CALENDAR_EVENT);

export const SAVE_CALENDAR_EVENT = createActionName("SAVE", MODULE_NAME);
export const SAVE_CALENDAR_EVENT_OK = setOK(SAVE_CALENDAR_EVENT);

export const clearCalendarEvent = createAction(CLEAR_CALENDAR_EVENT);
export const loadCalendarEvent = createAction(LOAD_CALENDAR_EVENT);
export const saveCalendarEvent = createAction(SAVE_CALENDAR_EVENT);
export const fetchPersons = createAction(FETCH_PERSONS);
// export const fetchAvailability = createAction(FETCH_AVAILABILITY);

export const setPerson = (value) => {
    console.log(value);
    const set = setFormValue.bind(null, MODULE_NAME, "patient");
    return set(value);
};

const state0 = {
    persons: [],
    // availability: {},
    initialValues: {},
    hasPerson: false
}

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_PERSONS_OK:
            return { ...state, persons: payload }
        case CLEAR_CALENDAR_EVENT:
            return { ...state, initialValues: {} }
        // case FETCH_AVAILABILITY_OK:
        //     return { ...state, availability: payload }
        case LOAD_CALENDAR_EVENT_OK:
            return { ...state, initialValues: payload }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

export const getPatientsFromState = (state) => state[MODULE_NAME].persons;
export const getInitialValues = (state) => {
    return {
        ...state[MODULE_NAME].initialValues,
    }
};
export const getCalendarEventTitle = (state) => {
    const { id, patient, notes = "" } = state[MODULE_NAME].initialValues;
    const p = patient && state[MODULE_NAME].persons[patient];
    return (id) ? [p.name, p.code, p.notes, notes].join(" ") : "New Calendar Event"
};

const selector = formValueSelector(MODULE_NAME);

const getGender = (state) => {
    
    const patients = getPatientsFromState(state);
    const patient = selector(state, 'patient');
    const ids = patients.map(p => p.id);
    const i = (patient) ? ids.indexOf(patient) : -1;
    
    return (i >= 0 && patients[i].gender) ? patients[i].gender.toLowerCase()[0] : "";
     
}

const s2p = (state, ownProps) => ({
    initialValues: {
        ...getInitialValues(state),
        ...ownProps.initialValues
    },
    patientOptions: getPatientsFromState(state).map(p => ({
        value: p.id,
        label: [p.name, p.code, p.notes].join(" ")
    })),
    submitSucceeded: hasSubmitSucceeded(MODULE_NAME)(state),
    disabledDate: !selector(state, 'patient'),
    gender: getGender(state)
});

const d2p = {
    submitActionCreator: saveCalendarEvent,
    loadCalendarEvent,
    clearCalendarEvent,
    fetchPersons,
    // fetchAvailability
};

export default connect2store({ s2p, d2p, form: MODULE_NAME })(CalendarEventForm);

const searchPatients = (token) => getPersons({ q: token })

// sagas
function* calendarEventFormListeners({ takeEvery, takeLatest }) {
    yield takeEvery(LOAD_CALENDAR_EVENT, apiSaga, viewCalendarEvent);
    yield takeEvery(SAVE_CALENDAR_EVENT, apiSaga, upsertCalendarEvent);
    yield takeEvery(FETCH_PERSONS, apiSaga, searchPatients);
    // yield takeEvery(FETCH_AVAILABILITY, apiSaga, roomAvailability);
}

registerSagas(calendarEventFormListeners);