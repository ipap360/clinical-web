import { registerReducer } from "redux-dynamic-config";
import { createAsyncNames, createAsyncAction, setOK } from "../../utils";
import { rooms } from "../../api";
const MODULE_NAME = "Rooms";

export const FETCH_ROOMS = createAsyncNames("FETCH", MODULE_NAME);
export const FETCH_ROOM_AVAILABILITY = createAsyncNames(
    "FETCH_AVAILABILITY",
    MODULE_NAME
);

export const fetchRooms = createAsyncAction(FETCH_ROOMS, rooms.query);
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
