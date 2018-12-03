import React, { Component } from "react";
import {
    TTypography,
    tableStyles,
    layoutStyles,
    headerBG,
    NavButton
} from "../../components";
import { consume } from "../../context";
import Main from "../Main";
import { fetchPatients, getPatients } from "./store";
import { Paper, Typography, Toolbar } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import classNames from "classnames";
import { PATIENT } from "../routes";
import PatientsNavBar from "./PatientsNavBar";

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
    componentDidMount() {
        const { fetchPatients } = this.props;
        console.log(this.props);
        fetchPatients();
    }

    componentWillUnmount() {}

    handleRowClick = evt => {
        const { history } = this.props;
        history.push(PATIENT.replace(":id", evt.currentTarget.dataset["id"]), {
            prev: window.location.pathname
        });
    };

    render() {
        const { patients, classes } = this.props;
        const {
            mainPaper,
            notFound,
            row,
            col,
            col1,
            col2,
            col3,
            col4,
            addBtn
        } = classes;

        const TitleCol = ({ className, children, ...other }) => (
            <TTypography
                variant="subtitle2"
                className={classNames(col, className)}
                {...other}
            >
                {children}
            </TTypography>
        );

        const Row = ({ className, children, ...other }) => (
            <div className={classNames(row, className)} {...other}>
                {children}
            </div>
        );

        const Col = ({ className, children, ...other }) => (
            <div className={classNames(col, className)} {...other}>
                {children}
            </div>
        );

        const PatientsListTitle = () => (
            <Toolbar className={classes.header} disableGutters>
                <TitleCol className={col1}>&nbsp;</TitleCol>
                <TitleCol className={col2}>Name</TitleCol>
                <TitleCol className={col3}>Code</TitleCol>
                <TitleCol className={col4}>Notes</TitleCol>
            </Toolbar>
        );

        return (
            <React.Fragment>
                <Main
                    title="Patients"
                    head={<PatientsListTitle />}
                    nav={<PatientsNavBar />}
                >
                    <Paper className={mainPaper} square>
                        {!patients.length && (
                            <TTypography className={notFound}>
                                We didn't find any patients
                            </TTypography>
                        )}
                        {patients.map((patient, i) => {
                            const { id, name, code, gender, notes } = patient;
                            const key = "patient-" + id;
                            return (
                                <Row
                                    key={key}
                                    data-id={id}
                                    onClick={this.handleRowClick}
                                >
                                    <Col className={col1}>
                                        <GenderIcon gender={gender} />
                                    </Col>
                                    <Col className={col2}>
                                        <Typography>{name}</Typography>
                                    </Col>
                                    <Col className={col3}>
                                        <Typography>{code}</Typography>
                                    </Col>
                                    <Col className={col4}>
                                        <Typography>{notes}</Typography>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Paper>
                    <NavButton
                        variant="fab"
                        className={addBtn}
                        color="secondary"
                        to={PATIENT.replace(":id", "0")}
                    >
                        <AddIcon />
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
