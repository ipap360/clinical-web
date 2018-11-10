import React, { Component } from "react";
import { Toolbar, Typography } from "@material-ui/core";
import moment from "moment";
import { consume } from "../../context";
import { getFormValue } from "../FormStateToRedux";
import { getPatientsById } from "../PatientsList";
import classNames from "classnames";
import styles from "./styles";

class CalendarEventTitle extends Component {
    render() {
        const { title, isNew, classes, t } = this.props;
        return (
            <Toolbar className={classes.header} disableGutters>
                <Typography
                    variant={!!title ? "overline" : "h5"}
                    className={classNames({ [classes.subtitle]: !!title })}
                >
                    {isNew ? t("New Appointment") : t("Edit Appointment")}
                </Typography>
                <Typography variant="h5" className={classes.title}>
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

const store = { s2p };
export default consume({ store, styles })(CalendarEventTitle);
