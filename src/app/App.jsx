import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Home from './home';
import Profile from './profile';
import Settings from './settings';

const App = () => (
    <Fragment>
        <Header />
        {/* <Route path="/app/events/:eventId" exact component={EditEvent} /> */}
        <Route exact path="/app/" component={Home} />
        <Route exact path="/app/profile" component={Profile} />
        <Route exact path="/app/settings" component={Settings} />
        <Footer />
    </Fragment>
);

export default App;