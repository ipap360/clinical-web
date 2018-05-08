import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, Dimmer, Button, Segment } from 'semantic-ui-react';
// import { withRouter } from 'react-router';
import t from 'i18n';
import { ActionLoader } from 'components';

class Confirm extends Component {

    constructor(props) {
        super(props);
        const { match: { params } } = props;

        props.dispatch({
            type: "CONFIRM_REGISTRATION_INITIALIZED",
            confirmation: params.confirmation
        });
    }

    render() {
        return (
            <Segment size='big' padded='very' style={{ minHeight: '400px', border: 'none' }}>
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

export default connect(mapStateToProps)(Confirm);

const confirmState = {
    loading: false,
    message: "",
    type: "",
    nav: ""
}

export const confirmReducer = (state = confirmState, action) => {
    switch (action.type) {
        case "CONFIRM_REGISTRATION_INITIALIZED":
            return {
                loading: true,
                message: t("Your registration is being confirmed"),
                type: "",
                nav: ""
            };
        case "CONFIRM_REGISTRATION_COMPLETED":
            return {
                loading: false,
                message: t("Your registration has been successfully confirmed!"),
                type: "success",
                nav: (<Link to='/login'>Login</Link>)
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