import CalendarEventForm from './CalendarEventForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { upsertCalendarEvent, getPersons, roomAvailability, viewCalendarEvent } from '../../api';
import { apiSaga } from '../../session';
// import { formValueSelector } from 'redux-form';
import {
    change as setFormValue,
    hasSubmitSucceeded
} from 'redux-form';

import moment from 'moment';

export const MODULE_NAME = 'calendarEventForm';

export const FETCH_PERSONS = createActionName("LIST_PERSONS", MODULE_NAME);
export const FETCH_AVAILABILITY = createActionName("FETCH_AVAILABILITY", MODULE_NAME);
export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);

export const CLEAR_CALENDAR_EVENT = createActionName("CLEAR", MODULE_NAME);

export const LOAD_CALENDAR_EVENT = createActionName("LOAD", MODULE_NAME);
export const LOAD_CALENDAR_EVENT_OK = setOK(LOAD_CALENDAR_EVENT);

export const SAVE_CALENDAR_EVENT = createActionName("SAVE", MODULE_NAME);
export const SAVE_CALENDAR_EVENT_OK = setOK(SAVE_CALENDAR_EVENT);

export const clearCalendarEvent = createAction(CLEAR_CALENDAR_EVENT);
export const loadCalendarEvent = createAction(LOAD_CALENDAR_EVENT);
export const saveCalendarEvent = createAction(SAVE_CALENDAR_EVENT);
export const fetchPersons = createAction(FETCH_PERSONS);
export const fetchAvailability = createAction(FETCH_AVAILABILITY);

export const setPerson = (value) => {
    const set = setFormValue.bind(null, MODULE_NAME, "person");
    return set(value);
};

const state0 = {
    availability: {},
    initialValues: {},
    hasPerson: false
}

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case CLEAR_CALENDAR_EVENT:
            return { ...state, initialValues: {} }
        case FETCH_AVAILABILITY_OK:
            return { ...state, availability: payload }
        case LOAD_CALENDAR_EVENT_OK:
            return { ...state, initialValues: payload}
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

export const getAvailability = (state) => state[MODULE_NAME].availability;
export const getInitialValues = (state) => {
    const values = state[MODULE_NAME].initialValues;
    return {
        ...values,
        date: values.date && moment(values.date)
        // personId: values.person
    }
};
export const getCalendarEventTitle = (state) => {
    const values = state[MODULE_NAME].initialValues;
    const person = (values.person) ? JSON.parse(values.person) : {};
    return (values.id) ? person.label + " " + values.description : "New Calendar Event"
};

// const selector = formValueSelector(MODULE_NAME);

const s2p = (state, ownProps) => ({
    initialValues: {
        ...getInitialValues(state),
        ...ownProps.initialValues
    },
    availability: getAvailability(state),
    submitSucceeded: hasSubmitSucceeded(MODULE_NAME)(state),
    // hasPerson: selector(state, 'personId') !== null
});

const d2p = { 
    submitActionCreator: saveCalendarEvent, 
    loadCalendarEvent, 
    clearCalendarEvent, 
    fetchPersons, 
    fetchAvailability
};

export default connect2store({ s2p, d2p, form: MODULE_NAME })(CalendarEventForm);

const searchPatients = (token) => {
    return getPersons({ q: token }).then(({ status, data }) => {
        return {
            status,
            data: data.map(e => ({
                value: e.id,
                label: e.name
            }))
        };
    });
}

// sagas
function* calendarEventFormListeners({ takeEvery, takeLatest }) {
    yield takeEvery(LOAD_CALENDAR_EVENT, apiSaga, viewCalendarEvent);
    yield takeEvery(SAVE_CALENDAR_EVENT, apiSaga, upsertCalendarEvent);
    yield takeLatest(FETCH_PERSONS, apiSaga, searchPatients);
    yield takeEvery(FETCH_AVAILABILITY, apiSaga, roomAvailability);
}

registerSagas(calendarEventFormListeners);