import CalendarEventPage from './CalendarEventPage';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { NEW_PERSON_OK } from '../PersonForm';
import { getCalendarEventTitle, setPerson, fetchPersons } from '../CalendarEventForm';
import { createActionName, createAction } from '../../helpers';
// import history from '../../history';
// import { ROOT } from '../paths';
// import { createActionName, createAction } from '../../helpers';

const MODULE_NAME = "calendarEventPage";

export const CLOSE_MODALS = createActionName("CLOSE_MODALS", MODULE_NAME);
export const NEW_PERSON_MODAL = createActionName("NEW_PERSON_MODAL", MODULE_NAME);
export const POSTPONE_MODAL = createActionName("POSTPONE_MODAL", MODULE_NAME);
export const COPY_MODAL = createActionName("COPY_MODAL", MODULE_NAME);

export const closeModals = createAction(CLOSE_MODALS);
export const newPersonModal = createAction(NEW_PERSON_MODAL);
export const postponeModal = createAction(POSTPONE_MODAL);
export const copyModal = createAction(COPY_MODAL);

const state0 = {
    newPatientModal: false,
    postponeEventModal: false,
    copyEventModal: false,
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case NEW_PERSON_MODAL:
            return {
                ...state,
                newPatientModal: true
            }
        case POSTPONE_MODAL:
            return {
                ...state,
                postponeEventModal: true
            }
        case COPY_MODAL:
            return {
                ...state,
                copyEventModal: true
            }
        case CLOSE_MODALS:
            return {
                ...state,
                newPatientModal: false,
                postponeEventModal: false,
                copyEventModal: false
            }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

const s2p = (state) => ({
    ...state[MODULE_NAME],
    title: getCalendarEventTitle(state)
});

const d2p = {
    closeModals,
    newPersonModal,
    postponeModal,
    copyModal,
};

export default connect2store({ s2p, d2p })(CalendarEventPage);

function* onNewPerson({ take, put }) {
    while (true) {
        const { payload } = yield take(NEW_PERSON_OK);

        console.log(payload);
        
        yield put(setPerson(payload.id));
        yield put(fetchPersons());
        yield put(closeModals());
    }
}

// function* onSaveEvent({take, put}) {
//     while (true) {
//         const { payload } = yield take(SAVE_CALENDAR_EVENT_OK);
//         history.push(ROOT);
//     }
// }

registerSagas(onNewPerson);