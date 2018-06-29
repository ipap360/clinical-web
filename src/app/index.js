import React, { Component } from 'react'

import App from './App';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import action, { LOGOUT } from 'common/actions';

import { reducer as calendarEvent } from './calendarEvent';

// import { withRouter } from 'react-router';
// import { LOGIN } from 'common/actions';

const getIsSignedIn = (session) => session.name !== null;

const logout = () => action(LOGOUT);

const mapS2P = (state) => ({
    isSignedIn: getIsSignedIn(state.session),
    name: state.session.name,
});

class AppContainer extends Component {
    render() {
        return (<App {...this.props} />)
    }
}

export default connect(mapS2P, { logout })(AppContainer);

export const reducer = combineReducers({ calendarEvent });