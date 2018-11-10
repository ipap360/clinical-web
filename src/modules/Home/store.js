import { registerReducer } from "redux-dynamic-config";
import {
    createAction,
    createAsyncNames,
    createAsyncAction,
    createActionName
} from "../../utils";

import { calendarEvents, roomAvailability } from "../../api";

import moment from "moment";

const MODULE_NAME = "calendar";

export const FETCH_CALENDAR_EVENTS = createAsyncNames(
    "FETCH_EVENTS",
    MODULE_NAME
);

export const FETCH_AVAILABILITY = createAsyncNames("FETCH_DAYS", MODULE_NAME);

export const PREV_WEEK = createActionName("PREV_WEEK", MODULE_NAME);
export const NEXT_WEEK = createActionName("NEXT_WEEK", MODULE_NAME);
export const THIS_WEEK = createActionName("THIS_WEEK", MODULE_NAME);

export const fetchCalendarEvents = createAsyncAction(
    FETCH_CALENDAR_EVENTS,
    calendarEvents.query
);
export const fetchAvailability = createAsyncAction(
    FETCH_AVAILABILITY,
    roomAvailability.query
);

export const prevWeek = createAction(PREV_WEEK);
export const nextWeek = createAction(NEXT_WEEK);
export const thisWeek = createAction(THIS_WEEK);

const state0 = {
    isLoggedIn: false,
    error: false,
    loading: false,
    selected: moment(),
    availability: {},
    events: []
};

const reducer = (state = state0, { type, payload }) => {
    const current = state.selected.clone();
    switch (type) {
        case PREV_WEEK:
            return {
                ...state,
                selected: current.subtract(1, "w"),
                events: []
            };
        case NEXT_WEEK:
            return {
                ...state,
                selected: current.add(1, "w"),
                events: []
            };
        case THIS_WEEK:
            return {
                ...state,
                selected: moment(),
                events: moment()
                    .startOf("day")
                    .isSame(current.startOf("day"))
                    ? state.events
                    : []
            };
        case FETCH_AVAILABILITY._:
            return { ...state, loading: true, error: false };
        case FETCH_AVAILABILITY.FAILED:
            return { ...state, loading: false, error: true };
        case FETCH_AVAILABILITY.OK:
            return { ...state, loading: false, availability: payload };
        case FETCH_CALENDAR_EVENTS._:
            return { ...state, loading: true, error: false };
        case FETCH_CALENDAR_EVENTS.FAILED:
            return { ...state, loading: false, error: true };
        case FETCH_CALENDAR_EVENTS.OK:
            return { ...state, loading: false, events: payload };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const hasCalendarError = state => state[MODULE_NAME].error;
export const isCalendarLoading = state => state[MODULE_NAME].loading;
export const getCalendarDates = state => {
    return getDatePeriod(state).map(d => {
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
};

export const getDatePeriod = state => {
    let d = state[MODULE_NAME].selected.clone().startOf("week");
    let week = [];
    for (let i = 1; i < 8; i++) {
        week.push(d.clone());
        d.add(1, "d");
    }
    return week;
};

export const getDatePeriodTitle = state => {
    const dates = getDatePeriod(state);

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
    const dates = getDatePeriod(state);
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
