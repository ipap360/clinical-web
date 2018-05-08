import React, { Component, Fragment } from 'react';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Visibility, Sidebar, Segment, Menu, Grid, Button, Container, Divider, List, Image, Icon } from 'semantic-ui-react';

import FixedMenu from './FixedMenu';
import PortalMenu from './PortalMenu';

// import SessionMenu from './portal/SessionMenu';

import Header from './Header';
import Footer from './Footer';

import Confirm, { confirmReducer } from './Confirm';
import Register from './Register';
import Home from './Home';

import './portal.css';
// import portalPhoto from '../resources/gloves.jpg';

class Portal extends Component {
    constructor(props) {

        super(props);

        this.state = {
            hasScrolledEnough: false,
            sidebarOpened: false
        };

    }

    hasScrolledEnough() {
        console.log("hasScrolledEnough")
        this.setState({ ...this.state, hasScrolledEnough: true });
    }

    hasNotScrolledEnough() {
        console.log("hasNotScrolledEnough")
        this.setState({ ...this.state, hasScrolledEnough: false });
    }

    handlePusherClick() {
        if (this.state.sidebarOpened) {
            this.setState({ ...this.state, sidebarOpened: false });
        }
    }

    handleBurgerClick() {
        this.setState({ ...this.state, sidebarOpened: !this.state.sidebarOpened });
    }

    render() {

        const isHidden = true;
        const { hasScrolledEnough, sidebarOpened } = this.state;

        return (
            <Fragment>
                <FixedMenu isVisible={hasScrolledEnough && !sidebarOpened} />
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
                        <PortalMenu />
                    </Sidebar>
                    <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick.bind(this)} style={{ minHeight: '100vh' }}>
                        <Header burgerHandler={this.handleBurgerClick.bind(this)} />
                        <Switch>
                            <Route path="/register/:confirmation" component={Confirm} />
                            <Route path="/register" component={Register} />
                            <Route path="/" render={(props) => (
                                <Home 
                                    onBottomPassed={this.hasScrolledEnough.bind(this)} 
                                    onBottomPassedReverse={this.hasNotScrolledEnough.bind(this)} 
                                />
                            )} />
                        </Switch>
                        <Footer />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, { match }) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setScrollPos: (position) => {
        //     dispatch({
        //         "type": 'PAGESCROLL',
        //         "reducer": (state, action) => {
        //             console.log(state, action);
        //             return state;
        //         }
        //     });
        // },
        // loadData: (...args) => {
        //   dispatch(api.request("WHOAMI", {}, (state, action) => {
        //     return Object.assign({}, {
        //       ...state,
        //       events: action.payload
        //     });
        //   }));
        // }
    }
}

Portal = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal));

export default Portal;

const layoutState = {
    // hasScrolledEnough: false,
    // sidebarOpened: false
}

export const portalReducer = combineReducers({
    "confirm": confirmReducer,
    "layout": (state = layoutState, action) => {
        switch (action.type) {
            default:
                return state;
        }
    }
});