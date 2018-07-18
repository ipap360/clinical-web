import NewCalendarEvent from './NewCalendarEvent';
import { registerReducer, connect2store, registerSagas } from '../../../common';
import { createActionName, createAction } from '../../helpers';
import { getPersons } from '../../api';
import { apiSaga } from '../../session';
import { NEW_PERSON_OK } from '../PersonForm';

// module name
export const MODULE_NAME = 'newCalendarEvent';

export const NEXT_STEP = createActionName("NEXT_STEP", MODULE_NAME);
export const PREVIOUS_STEP = createActionName("PREVIOUS_STEP", MODULE_NAME);
export const COMPLETE = createActionName("COMPLETE", MODULE_NAME);

export const FETCH_PERSONS = createActionName("FETCH_PERSONS", MODULE_NAME);
export const SET_PATIENT = createActionName("SET_PATIENT", MODULE_NAME);
export const SET_DATE = createActionName("SET_DATE", MODULE_NAME);
export const SET_DURATION = createActionName("SET_DURATION", MODULE_NAME);
export const SET_DESCRIPTION = createActionName("SET_DESCRIPTION", MODULE_NAME);

export const nextStep = createAction(NEXT_STEP);
export const previousStep = createAction(PREVIOUS_STEP);
export const complete = createAction(COMPLETE);
export const fetchPersons = createAction(FETCH_PERSONS);
export const setPatient = createAction(SET_PATIENT);
export const setDate = createAction(SET_DATE);
export const setDuration = createAction(SET_DURATION);
export const setDescription = createAction(SET_DESCRIPTION);

// initial state
const state0 = {
    activeStep: 0,
    steps: [
        {
            id: 'patient',
            label: "Select a patient or register a new one"
        },
        {
            id: 'dates',
            label: "Pick a date and the duration"
        },
        {
            id: 'details',
            label: "Event details"
        }
    ],
    patient: null,
    date: null,
    duration: 0,
    description: null
};

const reducer = (state = state0, { type, payload }) => {
    console.log(type);
    console.log(payload);
    switch (type) {
        case NEXT_STEP:
            return {
                ...state,
                activeStep: state.activeStep + 1
            }
        case PREVIOUS_STEP:
            return {
                ...state,
                activeStep: state.activeStep - 1
            }
        case NEW_PERSON_OK:
            return {
                ...state,
                patient: JSON.stringify({
                    value: payload.id,
                    label: payload.name + " (" + payload.age + ")"
                })
            }
        case SET_PATIENT:
            return {
                ...state,
                patient: payload
            }
        case SET_DATE:
            return {
                ...state,
                date: payload
            }
        case SET_DURATION:
            return {
                ...state,
                duration: payload
            }
        case SET_DESCRIPTION:
            return {
                ...state,
                description: payload
            }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

const local = (state) => state[MODULE_NAME];

export const getActiveStep = (state) => local(state).activeStep;
export const getSteps = (state) => local(state).steps;
export const getPatient = (state) => local(state).patient;
export const getDate = (state) => local(state).date;
export const getDuration = (state) => local(state).duration;
export const getDescription = (state) => local(state).description;

export const getAllowPrevious = (state) => getActiveStep(state) > 0;
export const getAllowNext = (state) => {
    switch (getActiveStep(state)) {
        case 0:
            return getPatient(state) !== null;
        case 1:
            return getDate(state) !== null;
        case 2:
            return getDescription(state) != null;
    }
}

const s2p = (state) => ({
    activeStep: getActiveStep(state),
    steps: getSteps(state),
    allowNext: getAllowNext(state),
    allowPrevious: getAllowPrevious(state),
    patient: getPatient(state),
    date: getDate(state),
    duration: getDuration(state),
    description: getDescription(state),
});

const d2p = ({
    nextStep,
    previousStep,
    complete,
    fetchPersons,
    setPatient,
    setDate,
    setDuration,
    setDescription,
});

export default connect2store({ s2p, d2p })(NewCalendarEvent);

const searchPatients = (token) => {
    return getPersons({ q: token }).then(({ status, data }) => {
        // console.log(response);
        return {
            status,
            data: data.map(e => ({
                value: e.id,
                label: e.name + " (" + e.age + ")"
            }))
        };
    });
}

// sagas
function* listeners({ takeLatest }) {
    yield takeLatest(FETCH_PERSONS, apiSaga.bind(null, searchPatients));
}

registerSagas(listeners);