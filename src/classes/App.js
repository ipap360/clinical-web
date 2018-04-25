import React, {Fragment} from 'react';
import { Route } from 'react-router-dom';

import Header from './app/Header';
import Footer from './app/Footer';

import Home from './app/Home';
import Profile from './app/Profile';
import Settings from './app/Settings';

const App = () => (
    <Fragment>
        <Header />
        {/* <Route path="/app/events/:eventId" exact component={EditEvent} /> */}
        <Route exact path="/app/" component={Home} />
        <Route exact path="/app/profile" component={Profile} />
        <Route exact path="/app/administration" component={Settings} />
        <Footer />
    </Fragment>
);

export default App;

export const appReducer = (state = {}, action) => {

    // probable just combine

    return state;
}