import { registerReducer, registerSagas } from "redux-dynamic-config";
import Home from "./Home";
import { createAction, createActionName, setOK, setFail } from "../../utils";

import { calendarEvents, roomAvailability } from "../../api";
import { withStore } from "../../context";
import { apiSaga, getIsSignedIn } from "../Session";
import moment from "moment";

const MODULE_NAME = "calendar";

export const FETCH_CALENDAR_EVENTS = createActionName(
    "FETCH_EVENTS",
    MODULE_NAME
);

export const FETCH_CALENDAR_EVENTS_OK = setOK(FETCH_CALENDAR_EVENTS);
export const FETCH_CALENDAR_EVENTS_FAIL = setFail(FETCH_CALENDAR_EVENTS);

export const FETCH_AVAILABILITY = createActionName("FETCH_DAYS", MODULE_NAME);
export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);
export const FETCH_AVAILABILITY_FAIL = setFail(FETCH_AVAILABILITY);

export const SET_SELECTED_DATE = createActionName(
    "SET_SELECTED_DATE",
    MODULE_NAME
);

export const fetchCalendarEvents = createAction(FETCH_CALENDAR_EVENTS);
export const fetchAvailability = createAction(FETCH_AVAILABILITY);

export const setSelectedDate = createAction(SET_SELECTED_DATE);

const getWeek = selected => {
    let d = selected.clone().startOf("week");
    let week = [];
    for (let i = 1; i < 8; i++) {
        week.push(d.clone());
        d.add(1, "d");
    }
    return week;
};

const state0 = {
    isLoggedIn: false,
    error: false,
    loading: false,
    selected: moment(),
    dates: getWeek(moment()),
    availability: {},
    events: []
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_DATE:
            return {
                ...state,
                selected: payload,
                dates: getWeek(payload),
                events: []
            };
        case FETCH_AVAILABILITY:
            return { ...state, loading: true, error: false };
        case FETCH_AVAILABILITY_FAIL:
            return { ...state, loading: false, error: true };
        case FETCH_AVAILABILITY_OK:
            return { ...state, loading: false, availability: payload };
        case FETCH_CALENDAR_EVENTS:
            return { ...state, loading: true, error: false };
        case FETCH_CALENDAR_EVENTS_FAIL:
            return { ...state, loading: false, error: true };
        case FETCH_CALENDAR_EVENTS_OK:
            return { ...state, loading: false, events: payload };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const hasCalendarError = state => state[MODULE_NAME].error;
export const isCalendarLoading = state => state[MODULE_NAME].loading;
export const getCalendarSelection = state => state[MODULE_NAME].selected;
export const getCalendarDates = state =>
    state[MODULE_NAME].dates.map(d => {
        const iso = d.format("YYYY-MM-DD");
        const availability = state[MODULE_NAME].availability[iso] || {
            male: "",
            female: ""
        };
        return {
            d,
            iso,
            num: d.format("D"),
            short: d.format("ddd"),
            availability
        };
    });

const getDatePeriod = state => {
    const dates = state[MODULE_NAME].dates;

    let m1 = dates[0].format("MMM");
    let m2 = dates[6].format("MMM");

    const y1 = dates[0].format("YYYY");
    const y2 = dates[6].format("YYYY");

    m1 = y1 !== y2 ? m1 + " " + y1 : m1;
    m2 = m1 !== m2 ? " - " + m2 : "";
    m2 = y1 !== y2 ? m2 + " " + y2 : m2 + " " + y1;

    return m1 + m2;
};

export const getCalendarEvents = state => {
    const events = state[MODULE_NAME].events;
    const dates = state[MODULE_NAME].dates;

    let isodates = dates.map(d => d.format("YYYY-MM-DD"));
    isodates.push(
        dates[6]
            .clone()
            .add(1, "d")
            .format("YYYY-MM-DD")
    );

    return events.map(e => {
        const checkin = isodates.indexOf(e.admissionDate);
        let checkout = isodates.indexOf(e.releaseDate);
        if (checkout < 0) checkout = 8;

        return {
            ...e,
            start: checkin + 1,
            end: checkout + 1
        };
    });
};

const s2p = state => ({
    isLoggedIn: getIsSignedIn(state),
    error: hasCalendarError(state),
    loading: isCalendarLoading(state),
    selected: getCalendarSelection(state),
    dates: getCalendarDates(state),
    events: getCalendarEvents(state),
    datePeriod: getDatePeriod(state)
});

const d2p = { fetchCalendarEvents, fetchAvailability, setSelectedDate };

export default withStore(s2p, d2p)(Home);

// sagas
function* homeListeners({ takeEvery, takeLatest }) {
    yield takeEvery(FETCH_AVAILABILITY, apiSaga, roomAvailability.query);
    yield takeEvery(FETCH_CALENDAR_EVENTS, apiSaga, calendarEvents.query);
}

registerSagas(homeListeners);
