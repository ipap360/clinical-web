import CalendarEventForm from './CalendarEventForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK, setFail } from '../../helpers';
import { upsertCalendarEvent, getPersons } from '../../api';
import { apiSaga } from '../../session';
// import { data } from '../../utils';
// import moment from 'moment';

export const MODULE_NAME = 'calendarEventForm';

export const FETCH_PERSONS = createActionName("LIST_PERSONS", MODULE_NAME);

export const SAVE_CALENDAR_EVENT = createActionName("INSERT", MODULE_NAME);
export const SAVE_CALENDAR_EVENT_OK = setOK(SAVE_CALENDAR_EVENT);

export const saveCalendarEvent = createAction(SAVE_CALENDAR_EVENT);
export const fetchPersons = createAction(FETCH_PERSONS);

const s2p = (state) => ({
    initialValues: {

    }
});

const d2p = { submitActionCreator: saveCalendarEvent, fetchPersons };

export default connect2store({ s2p, d2p, form: MODULE_NAME })(CalendarEventForm);

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
function* calendarEventFormListeners({ takeEvery, takeLatest }) {
    yield takeEvery(SAVE_CALENDAR_EVENT, apiSaga, upsertCalendarEvent);
    yield takeLatest(FETCH_PERSONS, apiSaga, searchPatients);
}

registerSagas(calendarEventFormListeners);