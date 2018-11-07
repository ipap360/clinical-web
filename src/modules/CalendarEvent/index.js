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

const s2p = state => ({
    // title: getCalendarEventTitle(state),
});

const d2p = {};

export default withStore(s2p, d2p)(CalendarEventPage);

// TODO: HOW?
// function* onNewPerson({ take, put }) {
//     while (true) {
//         const { payload } = yield take(SAVE_PATIENT_OK);

//         yield put(setPatient(payload.id));
//         yield put(fetchPatients());
//         yield put(closeModals());
//     }
// }

// function* onSaveEvent({take, put}) {
//     while (true) {
//         const { payload } = yield take(SAVE_CALENDAR_EVENT_OK);
//         history.push(ROOT);
//     }
// }

// registerSagas(onNewPerson);
