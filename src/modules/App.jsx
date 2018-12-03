import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home from "./Home";
import CalendarEvent from "./CalendarEvent";
import Patient from "./Patient";
import PatientsList from "./PatientsList";
import Profile from "./Profile";
import Settings from "./Settings";
import Login from "./Login";
import { fetchThresholds } from "./Thresholds";

import {
    ROOT,
    CALENDAR,
    CALENDAR_EVENT,
    PROFILE,
    SETTINGS,
    PATIENT,
    PATIENTS_LIST
} from "./routes";

import { consume } from "../context";
import { sessions, addAuthInterceptor } from "../api";

const SessionContext = React.createContext("session");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...sessions.init
        };
        const ref = this;
        addAuthInterceptor({
            onSessionUpdated: data => {
                ref.setState(state => data);
            }
        });
    }

    componentDidMount() {
        sessions.query();
        const { fetchThresholds } = this.props;
        fetchThresholds();
    }

    render() {
        const { name, language = "en" } = this.state;
        const isSignedIn = name !== null;
        const { classes } = this.props;
        const className = "class";
        return (
            <SessionContext.Provider value={this.state}>
                <Helmet
                    htmlAttributes={{ lang: language }}
                    bodyAttributes={{ [className]: classes.body }}
                />
                <Router>
                    {!isSignedIn ? (
                        <Switch>
                            {/* <Route path={RECOVER_PWD_INIT} component={RecoverPasswordInit} /> */}
                            <Route path={ROOT} component={Login} />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route path={CALENDAR} component={Home} />
                            <Route
                                path={CALENDAR_EVENT}
                                component={CalendarEvent}
                            />
                            <Route path={PATIENT} component={Patient} />
                            <Route
                                path={PATIENTS_LIST}
                                component={PatientsList}
                            />
                            <Route path={PROFILE} component={Profile} />
                            <Route path={SETTINGS} component={Settings} />
                            <Route path={ROOT} component={Home} />
                        </Switch>
                    )}
                </Router>
            </SessionContext.Provider>
        );
    }
}

const d2p = { fetchThresholds };
const store = { d2p };
const styles = theme => ({
    body: {
        fontFamily: theme.typography.fontFamily
    }
});

export default consume({ store, styles })(App);
