import CalendarEventForm from './CalendarEventForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK, setFail } from '../../helpers';
import { upsertCalendarEvent, getPersons } from '../../api';
import { apiSaga } from '../../session';
// import { data } from '../../utils';
// import moment from 'moment';

export const MODULE_NAME = 'calendarEventForm';

export const FETCH_PERSONS = createActionName("FETCH_PERSONS", MODULE_NAME);

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

// const asResponse = (data) => ({ status: 200, data });

// const getBirthYears = (token) => asResponse(
//     data.range2array(1910, (new Date()).getFullYear())
//         .filter(y => (!token || y.toString().indexOf(token) >= 0))
//         .map(y => ({ value: y, label: y }))
// );

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

function* onNewPerson({ take, call }) {
    while (true) {
        // const payload = yield take(NEW_PERSON_OK);
        // console.log(payload);
        // yield call(history.push, SIGNUP_EMAIL);
    }
}

registerSagas(calendarEventFormListeners, onNewPerson);