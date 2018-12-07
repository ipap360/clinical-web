import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Snackbar } from "../components";

import Home from "./Home";
import CalendarEvent from "./CalendarEvent";
import Patient from "./Patient";
import PatientsList from "./PatientsList";
import Profile from "./Profile";
import Settings from "./Settings";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { fetchThresholds } from "./Thresholds";

import {
    ROOT,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    CALENDAR,
    CALENDAR_EVENT,
    PROFILE,
    SETTINGS,
    PATIENT,
    PATIENTS_LIST
} from "./routes";

import { consume } from "../context";
import { sessions, addAuthInterceptor } from "../api";
import { getNotification, stopNotify, rmNotify } from "./store";

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

    handleNotificationClose = () => {
        const { stopNotify } = this.props;
        stopNotify();
    };

    handleNotificationExit = () => {
        const { rmNotify } = this.props;
        rmNotify();
    };

    render() {
        const { name, language = "en" } = this.state;
        const isSignedIn = name !== null;
        const { classes, notification } = this.props;
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
                            <Route
                                path={FORGOT_PASSWORD}
                                component={ForgotPassword}
                            />
                            <Route
                                path={RESET_PASSWORD}
                                component={ResetPassword}
                            />
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
                <Snackbar
                    onClose={this.handleNotificationClose}
                    onExited={this.handleNotificationExit}
                    {...notification}
                />
            </SessionContext.Provider>
        );
    }
}

const s2p = state => ({
    notification: getNotification(state)
});

const d2p = { fetchThresholds, stopNotify, rmNotify };
const store = { s2p, d2p };

const styles = theme => ({
    body: {
        fontFamily: theme.typography.fontFamily
    }
});

export default consume({ store, styles })(App);
