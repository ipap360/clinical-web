import React from 'react';
// import FilterLink from './FilterLink';
import { Route } from 'react-router-dom';

import Home from '../classes/Home';
import EditEvent from '../classes/EditEvent';
import Profile from '../classes/Profile';
import Settings from '../classes/Settings';
import Registration from '../classes/Registration';

const Content = () => (
    <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Registration} />
        <Route path="/events/:eventId" exact component={EditEvent} />
        <Route path="/profile" component={Profile} />
        <Route path="/administration" component={Settings} />
    </React.Fragment>
);

export default Content;
