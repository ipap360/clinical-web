import React from "react";
import { consume } from "../../context";
import { onSavePage } from "../../utils";
import Main from "../Main";
import { Paper } from "@material-ui/core";

import FormStateToRedux from "../FormStateToRedux";

import PatientSideBar from "./PatientSideBar";
import PatientForm from "./PatientForm";

import PatientTitle from "./PatientTitle";

import styles from "./styles";

class PatientPage extends React.Component {
    onSavePatient = onSavePage.bind(this, this.props.history);

    render() {
        const { classes, match } = this.props;

        const {
            params: { id }
        } = match;

        // eslint-disable-next-line
        const patientId = parseInt(id, 10);

        const isNew = patientId === 0;

        // const date = location.state && location.state.date;
        const formName = `patient${patientId}`;

        return (
            <React.Fragment>
                <PatientSideBar formName={formName} patientId={patientId} />
                <Main
                    title="Patients"
                    sidebar={true}
                    head={<PatientTitle form={formName} isNew={isNew} />}
                >
                    <Paper square className={classes.paper}>
                        <PatientForm
                            className={classes.form}
                            onSaveSuccess={this.onSavePatient}
                            id={patientId}
                        >
                            <FormStateToRedux form={formName} />
                        </PatientForm>
                    </Paper>
                </Main>
            </React.Fragment>
        );
    }
}

export default consume({ styles })(PatientPage);
