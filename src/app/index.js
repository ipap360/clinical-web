import React, { Component } from 'react'

import App from './App';

// import { combineReducers } from 'redux';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
// import { LOGIN } from 'common/actions';

const getIsSignedIn = (session) => session.name !== null;

const mapS2P = (state) => ({
    isSignedIn: getIsSignedIn(state.session),
});

const mapD2P = (dispatch, ...args) => {
    // console.log(dispatch, args, this);
    return {

    }
}

class AppContainer extends Component {
    render() {
        return (<App {...this.props} />)
    }
}

export default connect(mapS2P, mapD2P)(AppContainer);

export const reducer = (state = {}, action) => {

    // probable just combines

    return state;
}