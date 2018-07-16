import PersonForm from './PersonForm';
import { connect2store, registerSagas } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { savePerson } from '../../api';
import { apiSaga } from '../../session';

export const MODULE_NAME = 'personForm';

export const NEW_PERSON = createActionName("INSERT", MODULE_NAME);
export const NEW_PERSON_OK = setOK(NEW_PERSON);

export const newPerson = createAction(NEW_PERSON);

const d2p = { submitActionCreator: newPerson };

export default connect2store({ d2p, form: MODULE_NAME })(PersonForm);

// sagas
function* insertPersonListener({ takeEvery }) {
    yield takeEvery(NEW_PERSON, apiSaga.bind(null, savePerson));
}

function* onNewPerson({ take, call }) {
    while (true) {
        const payload = yield take(NEW_PERSON_OK);
        console.log(payload);
        // yield call(history.push, SIGNUP_EMAIL);
    }
}

registerSagas(insertPersonListener, onNewPerson);