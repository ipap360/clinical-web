import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Message } from 'semantic-ui-react';

import t from 'i18n';
import { BackgroundSegment } from 'components';

import Registration from './Registration';
import action, * as act from 'common/actions';

const { ok, fail, SIGNUP, SIGNUP_CONFIRM } = act;

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.registration
    };
};

const confirmSignup = (token) => action(SIGNUP_CONFIRM, {
    token
});

export default withRouter(connect(
    mapStateToProps,
    { confirmSignup }
)(Registration));

export const STATUS = {
    INIT: "INIT",
    EMAIL: "EMAIL",
    CONFIRM: "CONFIRM",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED"
}

const state0 = {
    status: STATUS.INIT,
    message: "",
    token: ""
};

export const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case SIGNUP_CONFIRM:
            return {
                ...state,
                status: STATUS.CONFIRM,
                message: t("Your request is being processed...")
            }
        case ok(SIGNUP_CONFIRM):
            return {
                ...state,
                status: STATUS.COMPLETED,
                message: payload.message
            }
        case fail(SIGNUP_CONFIRM):
            return {
                ...state,
                status: STATUS.FAILED,
                message: payload.message
            }
        case SIGNUP:
            return {
                ...state,
                status: STATUS.INIT,
                message: ""
            }
        case ok(SIGNUP):
            return {
                ...state,
                status: STATUS.EMAIL,
                message: payload.message
            };
        case fail(SIGNUP):
            return {
                ...state,
                status: STATUS.INIT,
                message: ""
            }
        default:
            return state;
    }
}