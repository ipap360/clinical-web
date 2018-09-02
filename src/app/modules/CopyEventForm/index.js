import CopyEventForm from './CopyEventForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { copyCalendarEvent,  roomAvailability } from '../../api';
import { apiSaga } from '../../session';

// import moment from 'moment';

export const MODULE_NAME = 'copyEventForm';

export const FETCH_AVAILABILITY = createActionName("FETCH_AVAILABILITY", MODULE_NAME);
export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);

export const SAVE_COPY_EVENT_FORM = createActionName("SAVE", MODULE_NAME);
export const SAVE_COPY_EVENT_FORM_OK = setOK(SAVE_COPY_EVENT_FORM);

export const saveCopyEventForm = createAction(SAVE_COPY_EVENT_FORM);
export const fetchAvailability = createAction(FETCH_AVAILABILITY);

const state0 = {
    availability: {}
}

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case FETCH_AVAILABILITY_OK:
            return { ...state, availability: payload }
        default:
            return state;
    }
}

registerReducer(MODULE_NAME, reducer);

export const getAvailability = (state) => state[MODULE_NAME].availability;

const s2p = (state, ownProps) => ({
    availability: getAvailability(state)
});

const d2p = { 
    submitActionCreator: saveCopyEventForm, 
    fetchAvailability
};

export default connect2store({ s2p, d2p, form: MODULE_NAME })(CopyEventForm);

// sagas
function* copyEventFormListeners({ takeEvery }) {
    yield takeEvery(SAVE_COPY_EVENT_FORM, apiSaga, copyCalendarEvent);
    yield takeEvery(FETCH_AVAILABILITY, apiSaga, roomAvailability);
}

registerSagas(copyEventFormListeners);