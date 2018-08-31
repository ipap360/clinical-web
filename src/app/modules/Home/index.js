import { date } from '../../utils';
import { registerReducer, connect2store, registerSagas } from '../../../common';
import Home from './Home';
import { createAction, createActionName, setOK, setFin } from '../../helpers';
import { listCalendarEvents } from '../../api';
import { apiSaga } from '../../session';

const MODULE_NAME = "calendar";

const today = date.midnight(new Date());

export const FETCH_CALENDAR_EVENTS = createActionName("FETCH_EVENTS", MODULE_NAME);
export const FETCH_CALENDAR_EVENTS_OK = setOK(FETCH_CALENDAR_EVENTS);
export const FETCH_CALENDAR_EVENTS_FIN = setFin(FETCH_CALENDAR_EVENTS);

export const fetchCalendarEvents = createAction(FETCH_CALENDAR_EVENTS);

const dates = [];

for (let i = 1; i < 8; i++) {
    let loopdate = new Date(today);
    loopdate.setUTCDate(today.getUTCDate() - today.getUTCDay() + i);
    dates.push({
        value: loopdate,
        availability: {
            male: '',
            female: 'limited'
        }
    });
}

const state0 = {
    loading: false,
    selected: today,
    dates,
    events: []
    // calendar: {
    //     dates: dates.map(d => ({
    //         number: d.getUTCDate(),
    //         text: moment.utc(d).format("ddd")
    //     }))
    // }
}

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_CALENDAR_EVENTS:
            return { ...state, loading: true }
        case FETCH_CALENDAR_EVENTS_FIN:
            return { ...state, loading: false }
        case FETCH_CALENDAR_EVENTS_OK:
            return { ...state, ...payload }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

export const isCalendarLoading = (state) => state[MODULE_NAME].loading;
export const getCalendarSelection = (state) => state[MODULE_NAME].selected;
export const getCalendarDates = (state) => state[MODULE_NAME].dates;
export const getCalendarEvents = (state) => state[MODULE_NAME].events;

const s2p = (state) => ({
    loading: isCalendarLoading(state),
    selected: getCalendarSelection(state),
    dates: getCalendarDates(state),
    events: getCalendarEvents(state)
});

const d2p = { fetchCalendarEvents }

export default connect2store({ s2p, d2p })(Home);

// sagas
function* homeListeners({ takeEvery, takeLatest }) {
    yield takeEvery(FETCH_CALENDAR_EVENTS, apiSaga, listCalendarEvents);
    // yield takeLatest(BIRTH_YEARS, apiSaga.bind(null, getBirthYears));
}

// function* onNewPerson({ take, call }) {
//     while (true) {
//         const payload = yield take(NEW_PERSON_OK);
//         console.log(payload);
//     }
// }

registerSagas(homeListeners);