import reducerRegistry from '../reducerRegistry';
import { createActionName, createAction } from '../helpers';
import connect from 'redux';

// module name
export const MODULE_NAME = 'NEW_CALENDAR_EVENT';

// initial state
const state0 = {
    activeStep: 0,
    steps: [
        {
            id: 'patient',
            label: "Select a patient or register a new one"
        },
        {
            id: 'dates',
            label: "Pick a date and the duration"
        },
        {
            id: 'details',
            label: "Event details"
        }
    ],
    patient: {
        selected: null,
        options: [],
        loading: false
    },
    scheduling: {
        date: null,
        duration: 0
    },
    description: null
};

const reducer = (state = state0, { type, payload }) => {
    return state;
}

reducerRegistry.register(MODULE_NAME, reducer);

const mapS2P = (state, ownProps) => ({

});

const mapD2P = (dispatch) => ({

});

export default connect(mapS2P, mapD2P);