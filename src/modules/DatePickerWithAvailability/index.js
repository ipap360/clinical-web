import { registerReducer } from "redux-dynamic-config";

import { consume } from "../../context";
import { createActionName, createAsyncAction, setOK } from "../../utils";
import { rooms } from "../../api";

import DatePickerWithAvailability from "./DatePickerWithAvailability";

export const MODULE_NAME = "DatePickerWithAvailability";

export const FETCH_AVAILABILITY = createActionName(
    "FETCH_AVAILABILITY",
    MODULE_NAME
);

export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);

export const fetchAvailability = createAsyncAction(
    FETCH_AVAILABILITY,
    rooms.availability
);

const state0 = {
    availability: {}
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_AVAILABILITY_OK:
            return { ...state, availability: payload };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

const getAvailability = (state, ownProps) => {
    const availability = state[MODULE_NAME].availability || {};
    const gender = ownProps.gender;

    const ga = {};

    // eslint-disable-next-line
    Object.keys(availability).map(function(key, index) {
        ga[key] = gender ? availability[key][gender].toLowerCase() : "";
    });

    return ga;
};

const s2p = (state, ownProps) => ({
    availability: getAvailability(state, ownProps)
});

const d2p = { fetchAvailability };
const store = { s2p, d2p };
export default consume({ store })(DatePickerWithAvailability);
