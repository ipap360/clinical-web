import CopyEventForm from './CopyEventForm';
import { connect2store, registerSagas } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { copy } from '../../api/calendar-events';
import { apiSaga } from '../../session';

export const MODULE_NAME = 'copyEventForm';

export const SAVE_COPY_EVENT_FORM = createActionName("SAVE", MODULE_NAME);
export const SAVE_COPY_EVENT_FORM_OK = setOK(SAVE_COPY_EVENT_FORM);

export const saveCopyEventForm = createAction(SAVE_COPY_EVENT_FORM);

const d2p = { 
    submitActionCreator: saveCopyEventForm
};

export default connect2store({ d2p, form: MODULE_NAME })(CopyEventForm);

// sagas
function* copyEventFormListeners({ takeEvery }) {
    yield takeEvery(SAVE_COPY_EVENT_FORM, apiSaga, copy);
}

registerSagas(copyEventFormListeners);