import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, Dimmer, Button, Segment } from 'semantic-ui-react';
// import { withRouter } from 'react-router';
import t from 'i18n';
import { ActionLoader } from 'components';
import LoginButton from 'portal/LoginButton';

class RegistrationConfirm extends Component {

    constructor(props) {
        super(props);
        const { match: { params } } = props;

        props.dispatch({
            type: "CONFIRM_REGISTRATION_INITIALIZED",
            payload: params.key
        });
    }

    render() {
        return (
            <Segment basic className='registration' size='huge' textAlign='center' padded='very' >
                <ActionLoader {...this.props} />
            </Segment>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.portal.confirm
    };
};

export default connect(mapStateToProps)(RegistrationConfirm);

const state0 = {
    loading: false,
    message: "",
    type: "",
    nav: ""
}

export const regConfirmReducer = (state = state0, action) => {
    switch (action.type) {
        case "CONFIRM_REGISTRATION_INITIALIZED":
            return {
                loading: true,
                message: t("Your registration is being confirmed"),
                nav: ""
            };
        case "CONFIRM_REGISTRATION_COMPLETED":
            return {
                loading: false,
                message: action.payload.message,
                type: "success",
                nav: (<LoginButton />)
            };
        case "CONFIRM_REGISTRATION_FAILED":
            return {
                loading: false,
                message: action.payload.message,
                type: "error",
                nav: ""
            };
        default:
            return state;
    }
}