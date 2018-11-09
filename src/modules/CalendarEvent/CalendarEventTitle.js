import React, { Component } from "react";
import { Toolbar, Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import { withStore } from "../../context";
import { getFormValue } from "../FormStateToRedux";
import { getPatientsById } from "../PatientsList";
import styles from "./styles";

class CalendarEventTitle extends Component {
    render() {
        const { title, classes } = this.props;
        return (
            <Toolbar className={classes.header} disableGutters>
                <Typography variant="headline" className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        );
    }
}

const getCalendarEventTitle = (state, form) => {
    const patient = getFormValue(state, form, "patient");
    const date = getFormValue(state, form, "date") || "";
    const formattedDate = date ? moment(date).format("dddd DD MMMM") : "";
    const patients = getPatientsById(state);
    const p = patient && patients[patient];
    return p
        ? [p.name, p.code ? `[${p.code}]` : "", formattedDate].join(" ")
        : "";
};

const s2p = (state, { form }) => ({
    title: getCalendarEventTitle(state, form)
});

export default withStore(s2p)(withStyles(styles)(CalendarEventTitle));
