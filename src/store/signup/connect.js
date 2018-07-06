import {translate} from "";
import { MODULE_NAME } from ".";

const getState = (state) => ({...state[MODULE_NAME]});

export default (comp) => translate()(connect(
    (state, ownProps) = ({
        getState(state)
    }),
    { 
        confirmSignup 
    }
)(comp));

const connect = (comp) => translate()(connect(mapS2P)(reduxForm({ form: SIGNUP })(comp)));