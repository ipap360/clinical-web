import { registerReducer } from "redux-dynamic-config";
import { createAsyncNames, createAsyncAction } from "../../utils";
import { thresholds } from "../../api";
const MODULE_NAME = "Thresholds";

export const FETCH_THRESHOLDS = createAsyncNames("FETCH", MODULE_NAME);
export const DELETE_THRESHOLD = createAsyncNames("DELETE", MODULE_NAME);

export const fetchThresholds = createAsyncAction(
    FETCH_THRESHOLDS,
    thresholds.query
);
export const deleteThreshold = createAsyncAction(
    DELETE_THRESHOLD,
    thresholds.del
);

const state0 = { thresholds: [] };

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_THRESHOLDS.OK:
            return {
                ...state,
                thresholds: payload
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

export const getThresholds = state => state[MODULE_NAME].thresholds;
