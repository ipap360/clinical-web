import { registerReducer } from "redux-dynamic-config";
import { createAsyncNames, createAsyncAction } from "../../utils";
import moment from "moment";
import { calendarEvents, rooms } from "../../api";

const MODULE_NAME = "calendar";

export const FETCH_CALENDAR_EVENTS = createAsyncNames(
    "FETCH_EVENTS",
    MODULE_NAME
);

export const FETCH_AVAILABILITY = createAsyncNames("FETCH_DAYS", MODULE_NAME);

export const fetchCalendarEvents = createAsyncAction(
    FETCH_CALENDAR_EVENTS,
    calendarEvents.query
);
export const fetchAvailability = createAsyncAction(
    FETCH_AVAILABILITY,
    rooms.availability
);

const state0 = {
    isLoggedIn: false,
    error: false,
    loading: false,
    availability: {},
    events: []
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_AVAILABILITY.OK:
            return { ...state, availability: payload };
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
export const getAvailability = state => state[MODULE_NAME].availability;

const position = (dates, e) => {
    const calendarStart = dates[0];
    const start = moment(e.admissionDate);
    let end = moment(e.releaseDate);
    let isDaily = true;
    // don't display the release day!
    if (end.isAfter(start)) {
        end.subtract(1, "d");
        isDaily = false;
    }

    const checkin = moment.duration(start.diff(calendarStart)).asDays();
    const checkout = moment.duration(end.diff(calendarStart)).asDays();

    return [checkin, checkout, isDaily];
};

export const getLength = dates =>
    moment.duration(dates[dates.length - 1].diff(dates[0])).asDays();

export const getCalendarEvents = state => dates => {
    const events = state[MODULE_NAME].events;
    return events
        .filter(e => {
            const calendarLength = getLength(dates);

            const [checkin, checkout] = position(dates, e);
            const isBefore = checkin < 0 && checkout < 0;
            const isAfter =
                (checkin > calendarLength) & (checkout > calendarLength);

            if (isBefore || isAfter) {
                return false;
            }

            return true;
        })
        .map(e => {
            const calendarLength = getLength(dates);

            const [checkin, checkout, isDaily] = position(dates, e);
            return {
                ...e,
                start: checkin < 0 ? 1 : checkin + 1,
                end:
                    (checkout > calendarLength ? calendarLength : checkout) + 1,
                isDaily,
                isCarryOver: checkin < 0,
                isContinued: checkout > calendarLength
            };
        });
};
