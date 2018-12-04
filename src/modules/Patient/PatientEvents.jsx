import React, { Component } from "react";
import {
    TTypography,
    tableStyles,
    layoutStyles,
    headerBG,
    hoverRowBG
} from "../../components";

import { Paper, AppBar, Toolbar, Button } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { consume } from "../../context";
import { CALENDAR_EVENT } from "../routes";
import { fetchEvents, getEvents } from "./store";
import moment from "moment";
import classNames from "classnames";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";

const styles = theme => ({
    ...layoutStyles(theme),
    ...tableStyles(theme),
    table: {
        minHeight: 100,
        tableLayout: "fixed",
        borderCollapse: "collapse",
        borderSpacing: 0
    },
    header: {
        backgroundColor: headerBG,
        width: "100%"
    },
    rowStyle: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: hoverRowBG
        }
    },
    currentRow: {
        borderLeft: "4px solid " + headerBG
    },
    futureRow: {
        borderLeft: "4px solid " + theme.palette.primary.main
    },
    colorPreview: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "inline-block"
    },
    legend: {
        height: 32,
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: theme.palette.text.secondary,
        "& > div": {
            paddingLeft: 4
        }
    }
});

class PatientEvents extends Component {
    componentDidMount() {
        const { fetchEvents, patientId } = this.props;
        fetchEvents(patientId);
    }

    handleRowClick = evt => {
        const { history } = this.props;
        const id = evt.currentTarget.dataset["id"];
        history.push(CALENDAR_EVENT.replace(":id", id));
    };

    render() {
        const { events, t, classes } = this.props;
        const {
            rowStyle,
            section,
            col2,
            sectionHeader,
            sectionBtn,
            colorPreview,
            notFound
        } = classes;

        return (
            <Paper className={section} square>
                <AppBar position="static" color="default">
                    <Toolbar className={sectionHeader}>
                        <TTypography variant="subtitle1">
                            Appointments
                        </TTypography>
                        <div className={classes.legend}>
                            <div className={classes.currentRow}>
                                {t("In progress")}
                            </div>
                            <div className={classes.futureRow}>
                                {t("Upcoming")}
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Admission Date")}</TableCell>
                            <TableCell>{t("Release Date")}</TableCell>
                            <TableCell>{t("Notes")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!events.length && (
                            <TableRow>
                                <TableCell colSpan={3} className={notFound}>
                                    {t("There are no appointments")}
                                </TableCell>
                            </TableRow>
                        )}
                        {events.map(row => {
                            const s = moment(row.admissionDate);
                            const e = moment(row.releaseDate);
                            const today = moment().startOf("day");
                            return (
                                <TableRow
                                    key={row.id}
                                    data-id={row.id}
                                    onClick={this.handleRowClick}
                                    className={classNames(rowStyle, {
                                        [classes.currentRow]:
                                            e.isAfter(today) &&
                                            !s.isAfter(today),
                                        [classes.futureRow]: s.isAfter(today)
                                    })}
                                >
                                    <TableCell>{s.format("L")}</TableCell>
                                    <TableCell>{e.format("L")}</TableCell>
                                    <TableCell>{row.eventNotes}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const s2p = state => ({
    events: getEvents(state)
});

const d2p = {
    fetchEvents
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(PatientEvents);
