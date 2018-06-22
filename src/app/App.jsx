import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Login from './login';
import Home from './home';
import Profile from './profile';
// import Settings from './settings';

// import {ActionLoader} from 'components';

export default (props) => {

    // console.log(props);
    const { isSignedIn } = props;

    if (!isSignedIn) return <Login />;

    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/calendar-event/:id" component={Profile} />
                <Route path="/calendar-event/add" component={Profile} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </Fragment>
    )
};
