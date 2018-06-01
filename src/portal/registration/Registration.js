import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Message } from 'semantic-ui-react';



import t from 'i18n';
import { BackgroundSegment } from 'components';

import registerPhoto from 'resources/register.jpeg';
import RegistrationForm from './RegistrationForm';

class Registration extends Component {

    constructor(props) {
        super(props);

        // const { match: { params } } = props;

        // props.dispatch({
        //     type: "CONFIRM_REGISTRATION_INITIALIZED",
        //     payload: params.key
        // });
    }

    render() {

        const { status, message } = this.props;

        return (
            <BackgroundSegment basic className='registration' url={registerPhoto}>
                {(status === REG_STATUS.FORM) ? (<RegistrationForm />) : (<Message>{message}</Message>)}
            </BackgroundSegment >
        );
    };

}

const mapStateToProps = (state, { match }) => {
    const { status, message } = state.portal.registration;
    return {
        status,
        message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration));

const REG_STATUS = {
    FORM: 0,
    AWAIT_CONFIRM: 1,
    // CONFIRM: 2,
    // COMPLETED: 3
};

const iState = {
    status: REG_STATUS.FORM,
    message: ""
};

export const registrationReducer = (state = iState, action) => {
    switch (action.type) {
        case "SIGNUP_COMPLETED":
            return Object.assign({}, ...state, {
                status: REG_STATUS.AWAIT_CONFIRM,
                ...action.payload
            });
        default:
            return state;
    }
}