import React, { Component } from "react";
import {
    TTypography,
    SimpleTable,
    tableStyles,
    layoutStyles,
    headerBG,
    NavButton
} from "../../components";
import { consume } from "../../context";
import TopBar from "../TopBar";
import Main from "../Main";
import { fetchPatients, getPatients } from "./store";
import { Paper, Typography, Toolbar, Icon } from "@material-ui/core";
import classNames from "classnames";
import { PATIENT } from "../routes";

const GenderIcon = ({ gender }) => {
    if (!gender) return null;
    const icon = gender === "MALE" ? "fas fa-mars" : "fas fa-venus";
    return (
        <div className="icon-gender">
            <span className={icon} />
        </div>
    );
};

const styles = theme => ({
    ...layoutStyles(theme),
    ...tableStyles(theme),
    root: {},
    header: {
        backgroundColor: headerBG,
        width: "100%"
    },
    row: {
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing.unit * 1.5}px 0`,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#EFEFEF"
        },
        "&:not(:last-child)": {
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    },
    col: {
        padding: `0 ${theme.spacing.unit / 2}px`
    },
    col1: {
        width: 30,
        flex: "none"
    },
    col2: {
        width: 300,
        flex: "none",
        maxWidth: "40%"
    },
    col3: {
        width: 100,
        flex: "none"
    },
    col4: {
        flex: "1 auto"
    }
});

class PatientsList extends Component {
    constructor(props) {
        super(props);
        this.topRef = React.createRef();
    }

    componentDidMount() {
        const { fetchPatients } = this.props;
        fetchPatients();
    }

    componentWillUnmount() {}

    render() {
        const { patients, t, classes, history } = this.props;
        const { row, col, col1, col2, col3, col4, addBtn } = classes;
        // console.log(patients);

        // const data = {
        //     id: "Patients",
        //     head: [],
        //     // head: [
        //     //     [
        //     //         { t: "", w: 30 },
        //     //         { t: t("Name") },
        //     //         { t: t("Code"), w: 80 },
        //     //         t("Notes")
        //     //     ]
        //     // ],
        //     body:
        //     })
        // };

        let container;
        const ref = this.topRef.current;
        if (ref != null) {
            container = ref.bodyRef && ref.bodyRef.current;
        }

        const PatientsListTitle = () => (
            <Toolbar className={classes.header} disableGutters>
                <TTypography
                    variant="subtitle2"
                    className={classNames(col, col1)}
                >
                    &nbsp;
                </TTypography>
                <TTypography
                    variant="subtitle2"
                    className={classNames(col, col2)}
                >
                    {t("Name")}
                </TTypography>
                <TTypography
                    variant="subtitle2"
                    className={classNames(col, col3)}
                >
                    {t("Code")}
                </TTypography>
                <TTypography
                    variant="subtitle2"
                    className={classNames(col, col4)}
                >
                    {t("Notes")}
                </TTypography>
            </Toolbar>
        );

        return (
            <React.Fragment>
                <TopBar title="Patients" body={<PatientsListTitle />} />
                <Main>
                    <Paper square>
                        {patients.map((patient, i) => {
                            const { id, name, code, gender, notes } = patient;
                            return (
                                <div
                                    className={row}
                                    key={"patient-" + id}
                                    onClick={() => {
                                        history.push(
                                            PATIENT.replace(":id", id)
                                        );
                                    }}
                                >
                                    <div className={classNames(col, col1)}>
                                        <GenderIcon gender={gender} />
                                    </div>
                                    <Typography
                                        className={classNames(col, col2)}
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        className={classNames(col, col3)}
                                    >
                                        {code}
                                    </Typography>
                                    <Typography
                                        className={classNames(col, col4)}
                                    >
                                        {notes}
                                    </Typography>
                                </div>
                            );
                        })}
                    </Paper>
                    <NavButton
                        variant="fab"
                        className={addBtn}
                        color="secondary"
                        to={PATIENT.replace(":id", "0")}
                    >
                        <Icon>add</Icon>
                    </NavButton>
                </Main>
            </React.Fragment>
        );
    }
}

const s2p = state => ({
    patients: getPatients(state)
});

const d2p = {
    fetchPatients
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(PatientsList);
