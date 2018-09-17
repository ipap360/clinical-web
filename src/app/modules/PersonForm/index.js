import PersonForm from './PersonForm';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK, setFail } from '../../helpers';
import { savePerson } from '../../api';
import { apiSaga } from '../../session';
import { data } from '../../utils';

// import moment from 'moment';

export const MODULE_NAME = 'personForm';

export const NEW_PERSON = createActionName("SAVE", MODULE_NAME);
export const NEW_PERSON_OK = setOK(NEW_PERSON);

// export const BIRTH_YEARS = createActionName("BIRTH_YEARS", MODULE_NAME);
// export const BIRTH_YEARS_OK = setOK(BIRTH_YEARS);
// export const BIRTH_YEARS_FAIL = setFail(BIRTH_YEARS);

export const newPerson = createAction(NEW_PERSON);
// export const birthYears = createAction(BIRTH_YEARS);

// const state0 = {
//     years: []
// }

// const reducer = (state = state0, { type, payload }) => {
//     switch (type) {
// case BIRTH_YEARS_FAIL:
// case BIRTH_YEARS:
//     return {
//         ...state,
//         birthYearOptions: [],
//         birthYearLoading: type === BIRTH_YEARS,
//     }
// case BIRTH_YEARS_OK:
//     return {
//         ...state,
//         birthYearOptions: payload,
//         birthYearLoading: false,
//     }
//         default:
//             return state
//     }
// }

// registerReducer(MODULE_NAME, reducer);

const s2p = (state) => ({
    birthYears: data.range2array(1910, (new Date()).getFullYear()).map(y => ({ value: y, label: y }))
});

const d2p = { submitActionCreator: newPerson };

export default connect2store({ s2p, d2p, form: MODULE_NAME })(PersonForm);

// sagas
function* personFormListeners({ takeEvery, takeLatest }) {
    yield takeEvery(NEW_PERSON, apiSaga.bind(null, savePerson));
}

registerSagas(personFormListeners);