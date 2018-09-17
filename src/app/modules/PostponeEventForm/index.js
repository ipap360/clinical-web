import CopyEventForm from '../CopyEventForm/CopyEventForm';
import { connect2store, registerSagas } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { postponeCalendarEvent } from '../../api';
import { apiSaga } from '../../session';

export const MODULE_NAME = 'postponeEventForm';

export const SAVE_POSTPONE_EVENT_FORM = createActionName("SAVE", MODULE_NAME);
export const SAVE_POSTPONE_EVENT_FORM_OK = setOK(SAVE_POSTPONE_EVENT_FORM);

export const savePostponeEventForm = createAction(SAVE_POSTPONE_EVENT_FORM);

const d2p = { 
    submitActionCreator: savePostponeEventForm
};

export default connect2store({ d2p, form: MODULE_NAME })(CopyEventForm);

// sagas
function* postponeEventFormListeners({ takeEvery }) {
    yield takeEvery(SAVE_POSTPONE_EVENT_FORM, apiSaga, postponeCalendarEvent);
}

registerSagas(postponeEventFormListeners);