import DatePickerWithAvailability from './DatePickerWithAvailability';
import { connect2store, registerSagas, registerReducer } from '../../../common';
import { createActionName, createAction, setOK } from '../../helpers';
import { roomAvailability } from '../../api';
import { apiSaga } from '../../session';

export const MODULE_NAME = 'DatePickerWithAvailability';

export const FETCH_AVAILABILITY = createActionName("FETCH_AVAILABILITY", MODULE_NAME);
export const FETCH_AVAILABILITY_OK = setOK(FETCH_AVAILABILITY);

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

const getAvailability = (state, ownProps) => {

    const availability = state[MODULE_NAME].availability || {};
    const gender = ownProps.gender;

    const ga = {};
    Object.keys(availability).map(function(key, index) {
        ga[key] = (gender) ? availability[key][gender].toLowerCase() : "";
     });

    return ga;  
}

const s2p = (state, ownProps) => ({
    availability: getAvailability(state, ownProps)
});

const d2p = { fetchAvailability };

export default connect2store({ s2p, d2p })(DatePickerWithAvailability);

// sagas
function* availabilityListener({ takeEvery }) {
    yield takeEvery(FETCH_AVAILABILITY, apiSaga, roomAvailability);
}

registerSagas(availabilityListener);