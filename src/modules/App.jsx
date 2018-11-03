import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import CalendarEvent from "./CalendarEvent";
import Patient from "./Patient";
import PatientsList from "./PatientsList";
import Profile from "./Profile";
import Settings from "./Settings";
import Login from "./Login";

import {
    ROOT,
    CALENDAR_EVENT,
    PROFILE,
    SETTINGS,
    PATIENT,
    PATIENTS_LIST
} from "./routes";

class App extends React.Component {
    render() {
        const { isSignedIn } = this.props;
        return (
            <Router>
                {!isSignedIn ? (
                    <Switch>
                        {/* <Route path={RECOVER_PWD_INIT} component={RecoverPasswordInit} /> */}
                        <Route path={ROOT} component={Login} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route
                            path={CALENDAR_EVENT}
                            component={CalendarEvent}
                        />
                        <Route path={PATIENT} component={Patient} />
                        <Route path={PATIENTS_LIST} component={PatientsList} />
                        <Route path={PROFILE} component={Profile} />
                        <Route path={SETTINGS} component={Settings} />
                        <Route path={ROOT} component={Home} />
                    </Switch>
                )}
            </Router>
        );
    }
}
export default App;
