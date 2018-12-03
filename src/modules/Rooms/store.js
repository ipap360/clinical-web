import { registerReducer } from "redux-dynamic-config";
import { createAsyncNames, createAsyncAction } from "../../utils";
import { rooms } from "../../api";
import { getThresholds } from "../Thresholds";

const MODULE_NAME = "Rooms";

export const FETCH_ROOMS = createAsyncNames("FETCH", MODULE_NAME);
export const DELETE_ROOM = createAsyncNames("DELETE", MODULE_NAME);
export const FETCH_ROOM_AVAILABILITY = createAsyncNames(
    "FETCH_AVAILABILITY",
    MODULE_NAME
);

export const fetchRooms = createAsyncAction(FETCH_ROOMS, rooms.query);
export const deleteRoom = createAsyncAction(DELETE_ROOM, rooms.del);
export const fetchRoomAvailability = createAsyncAction(
    FETCH_ROOM_AVAILABILITY,
    rooms.availability
);

const state0 = { availability: [], rooms: [] };

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_ROOMS.OK:
            return {
                ...state,
                rooms: payload
            };
        case FETCH_ROOM_AVAILABILITY.OK:
            return {
                ...state,
                availability: payload
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const getRooms = state => state[MODULE_NAME].rooms;
export const getAvailability = state => state[MODULE_NAME].availability;

const getIndicator = (thresholds, value) => {
    let indicator = { color: "", text: "", number: value };
    for (let i = thresholds.length - 1; i >= 0; i--) {
        const T = thresholds[i];
        if (T.threshold >= value) {
            indicator.color = T.indicator;
            indicator.text = T.description;
        }
    }
    return indicator;
};

export const getAvailabilityWithIndicators = state => {
    let result = {};
    const a = getAvailability(state);
    const b = getThresholds(state);

    Object.keys(a).forEach(key => {
        const value = a[key];
        result[key] = {
            ...value,
            m: getIndicator(b, value.m),
            f: getIndicator(b, value.f)
        };
    });

    return result;
};
