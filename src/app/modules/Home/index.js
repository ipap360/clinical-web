// import { date } from '../../utils';
import { registerReducer, connect2store, registerSagas } from '../../../common';
import Home from './Home';
import { createAction, createActionName, setOK, setFin } from '../../helpers';
import { calendarEvents, roomAvailability } from '../../api';
import { apiSaga } from '../../session';
import moment from 'moment';
// import history from '../../history';

const MODULE_NAME = "calendar";

export const FETCH_CALENDAR_EVENTS = createActionName("FETCH_EVENTS", MODULE_NAME);
export const FETCH_CALENDAR_EVENTS_OK = setOK(FETCH_CALENDAR_EVENTS);
export const FETCH_CALENDAR_EVENTS_FIN = setFin(FETCH_CALENDAR_EVENTS);

export const FETCH_AVAILABILITY = createActionName("FETCH_DAYS", MODULE_NAME);
export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);
export const FETCH_AVAILABILITY_FIN = setFin(FETCH_AVAILABILITY);

export const SET_SELECTED_DATE = createActionName("SET_SELECTED_DATE", MODULE_NAME);

export const fetchCalendarEvents = createAction(FETCH_CALENDAR_EVENTS);
export const fetchAvailability = createAction(FETCH_AVAILABILITY);
export const setSelectedDate = createAction(SET_SELECTED_DATE);

const getWeek = (selected) => {
    let d = selected.clone().startOf('week');
    let week = [];
    for (let i = 1; i < 8; i++) {
        week.push(d.clone());
        d.add(1, 'd');
    }
    return week;
}

const state0 = {
    loading: false,
    selected: moment(),
    dates: getWeek(moment()),
    availability: {},
    events: []
}

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_DATE:
            return { ...state, selected: payload, dates: getWeek(payload) }
        case FETCH_AVAILABILITY:
            return { ...state, loading: true }
        case FETCH_AVAILABILITY_FIN:
            return { ...state, loading: false }
        case FETCH_AVAILABILITY_OK:
            return { ...state, availability: payload }
        case FETCH_CALENDAR_EVENTS:
            return { ...state, loading: true }
        case FETCH_CALENDAR_EVENTS_FIN:
            return { ...state, loading: false }
        case FETCH_CALENDAR_EVENTS_OK:
            return { ...state, events: payload }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

export const isCalendarLoading = (state) => state[MODULE_NAME].loading;
export const getCalendarSelection = (state) => state[MODULE_NAME].selected;
export const getCalendarDates = (state) => state[MODULE_NAME].dates.map(d => {
    const iso = d.format("YYYY-MM-DD");
    const availability = state[MODULE_NAME].availability[iso] || { male: "", female: "" };
    return {
        d,
        iso,
        num: d.format("D"),
        short: d.format("ddd"),
        availability
    };
});

export const getCalendarEvents = (state) => state[MODULE_NAME].events;

const s2p = (state) => ({
    loading: isCalendarLoading(state),
    selected: getCalendarSelection(state),
    dates: getCalendarDates(state),
    events: getCalendarEvents(state)
});

const d2p = { fetchCalendarEvents, fetchAvailability, setSelectedDate }

export default connect2store({ s2p, d2p })(Home);

// sagas
function* homeListeners({ takeEvery, takeLatest }) {
    yield takeEvery(FETCH_AVAILABILITY, apiSaga, roomAvailability);
    yield takeEvery(FETCH_CALENDAR_EVENTS, apiSaga, calendarEvents);
}

registerSagas(homeListeners);