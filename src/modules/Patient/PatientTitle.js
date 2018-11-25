import React, { Component } from "react";
import { Toolbar, Typography } from "@material-ui/core";

import { consume } from "../../context";

import classNames from "classnames";
import styles from "./styles";
import { getPatientTitle } from "./store";

class PatientTitle extends Component {
    render() {
        const { title, isNew, classes, t } = this.props;
        return (
            <Toolbar className={classes.header} disableGutters>
                <Typography
                    variant={!!title ? "overline" : "h5"}
                    className={classNames({ [classes.subtitle]: !!title })}
                >
                    {isNew ? t("New Patient") : t("Edit Patient")}
                </Typography>
                <Typography variant="h5" className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        );
    }
}

const s2p = (state, { form }) => ({
    title: getPatientTitle(state, form)
});

const store = { s2p };
export default consume({ store, styles })(PatientTitle);
