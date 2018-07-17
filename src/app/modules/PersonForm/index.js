import PersonForm from './PersonForm';
import { connect2store, registerSagas } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { savePerson } from '../../api';
import { apiSaga } from '../../session';
import { promises } from 'fs';

export const MODULE_NAME = 'personForm';

export const NEW_PERSON = createActionName("INSERT", MODULE_NAME);
export const NEW_PERSON_OK = setOK(NEW_PERSON);

export const BIRTH_YEARS = createActionName("BIRTH_YEARS", MODULE_NAME);
export const BIRTH_YEARS_OK = setOK(BIRTH_YEARS);

export const newPerson = createAction(NEW_PERSON);
export const birthYears = createAction(BIRTH_YEARS);


const d2p = { submitActionCreator: newPerson, birthYears };

export default connect2store({ d2p, form: MODULE_NAME })(PersonForm);

const getBirthYears = (searchToken) => new Promise((resolve, reject) => {
    console.log(searchToken);
    setTimeout(function(){
        resolve([1999, 2000].map(y => ({
            value: y,
            label: y,
        }))); 
    }, 1)
})
// .then(response => {
//     console.log(response);
//     return response;
// });
// const getBirthYears = (searchToken) => [1999, 2000].map(y => ({
//     value: y,
//     label: y,
// }));

// sagas
function* personFormListeners({ takeEvery, takeLatest }) {
    yield takeEvery(NEW_PERSON, apiSaga.bind(null, savePerson));
    yield takeLatest(BIRTH_YEARS, apiSaga.bind(null, getBirthYears));
}

function* onNewPerson({ take, call }) {
    while (true) {
        const payload = yield take(NEW_PERSON_OK);
        console.log(payload);
        // yield call(history.push, SIGNUP_EMAIL);
    }
}

registerSagas(personFormListeners, onNewPerson);