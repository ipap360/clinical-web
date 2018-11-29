import React, { Component } from "react";
import { Toolbar, Typography } from "@material-ui/core";

import { consume } from "../../context";

import classNames from "classnames";
import styles from "./styles";
import { getCalendarEventTitle } from "./store";

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

const s2p = (state, { form }) => ({
    title: getCalendarEventTitle(state, form)
});

const store = { s2p };
export default consume({ store, styles })(CalendarEventTitle);
