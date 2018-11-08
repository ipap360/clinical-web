import CalendarEventPage from "./CalendarEventPage";
import { registerReducer } from "redux-dynamic-config";
import { withStore } from "../../context";

const MODULE_NAME = "calendarEvent";

const reducer = (state = {}, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

const s2p = state => ({});

const d2p = {};

export default withStore(s2p, d2p)(CalendarEventPage);
