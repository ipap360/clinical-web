import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import createHistory from "history/createBrowserHistory";


import Home from './Home';
import CalendarEventPage from './CalendarEventPage';
// import EditCalendarEvent from './EditCalendarEvent';
import Signup from './Signup';
import SignupEmail from './SignupEmail';
import SignupConfirm from './SignupConfirm';
import Profile from './Profile';
import Settings from './Settings';

import { 
    ROOT, 
    SIGNUP, 
    SIGNUP_EMAIL, 
    SIGNUP_CONFIRM, 
    // NEW_CALENDAR_EVENT, 
    EDIT_CALENDAR_EVENT, 
    PROFILE, 
    SETTINGS 
} from './paths';

// console.log(Home);
// console.log(Login);
// console.log(NewCalendarEvent);
// console.log(EditCalendarEvent);
// console.log(Signup);
// console.log(SignupEmail);
// console.log(SignupConfirm);
// console.log(Profile);
// console.log(Settings);

export default () => (
    <Router>
        <Switch>
            <Route path={SIGNUP} component={Signup} />
            <Route path={SIGNUP_CONFIRM} component={SignupConfirm} />
            <Route path={SIGNUP_EMAIL} component={SignupEmail} />
            {/* <Route path={NEW_CALENDAR_EVENT} component={NewCalendarEvent} /> */}
            <Route path={EDIT_CALENDAR_EVENT} component={CalendarEventPage} />
            <Route path={PROFILE} component={Profile} />
            <Route path={SETTINGS} component={Settings} />
            <Route path={ROOT} component={Home} />
        </Switch>
    </Router>
);