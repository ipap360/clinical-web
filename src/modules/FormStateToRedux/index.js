import { connect } from "react-redux";
import { registerReducer } from "../../context";
import { createActionName } from "../../utils";
import FormStateToRedux from "./FormStateToRedux";

const MODULE_NAME = "forms";

// Actions
const UPDATE_FORM_STATE = createActionName("UPDATE", MODULE_NAME);

// Reducer
const reducer = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_FORM_STATE:
            return {
                ...state,
                [action.form]: action.payload
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

// Action Creators
export const updateFormState = (form, state) => ({
    type: UPDATE_FORM_STATE,
    form,
    payload: state
});

// Selectors
export const getFormState = (state, form) =>
    (state && state[MODULE_NAME] && state[MODULE_NAME][form]) || {};

export const getFormValue = (state, form, name) => {
    const s = getFormState(state, form);
    return (s && s.values && s.values[name]) || null;
};

export default connect(
    undefined,
    { updateFormState }
)(FormStateToRedux);
