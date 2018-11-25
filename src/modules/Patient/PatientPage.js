import React from "react";
import { Redirect } from "react-router";
import { consume } from "../../context";
import { onSavePage } from "../../utils";
import Main from "../Main";
import { Paper, Button, Divider } from "@material-ui/core";

import { RichButton, TTypography, ButtonWithAlert } from "../../components";

import TopBar from "../TopBar";
import SideBar from "../SideBar";

import PatientForm from "./PatientForm";
import FormStateToRedux from "../FormStateToRedux";
import PatientTitle from "./PatientTitle";

import { ROOT } from "../routes";

import styles from "./styles";
import {
    getDeleted,
    // getIsDisabled,
    getIsMounted,
    deletePatient
} from "./store";

class PatientPage extends React.Component {
    patientFrmRef = React.createRef();
    onSavePatient = onSavePage.bind(this, this.props.history);
    render() {
        const {
            t,
            classes,
            history,
            location,
            match,
            isDeleted,
            // isDisabled,
            isMounted
            // caller = ROOT
        } = this.props;

        const {
            params: { id }
        } = match;

        // eslint-disable-next-line
        const patientId = parseInt(id, 10);

        if (isDeleted(patientId)) {
            console.log(history, location);
            // return <Redirect to={caller} />;
        }

        const isNew = patientId === 0;

        // const date = location.state && location.state.date;
        const formName = `patient${patientId}`;

        return (
            <React.Fragment>
                <TopBar
                    sidebar={true}
                    title="Patients"
                    body={<PatientTitle form={formName} isNew={isNew} />}
                />
                <SideBar>
                    <div className={classes.sidebar}>
                        <div>
                            <RichButton
                                icon="fas fa-arrow-left"
                                fullWidth
                                onClick={() => history.go(-1)}
                                variant="outlined"
                            >
                                {t("Back")}
                            </RichButton>
                        </div>
                        <Divider />
                        {isMounted(formName) &&
                            (isNew ? null : (
                                <div>
                                    <ButtonWithAlert
                                        alertTitle={t(
                                            "Are you sure you want to delete this patient?"
                                        )}
                                        alertBody={t(
                                            "This is a non-reversible action! The patient and all related data will be deleted!"
                                        )}
                                        icon="fas fa-trash-alt"
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                            deletePatient(patientId);
                                        }}
                                    >
                                        {t("Delete")}
                                    </ButtonWithAlert>
                                </div>
                            ))}
                    </div>
                </SideBar>
                <Main sidebar={true}>
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

const s2p = state => ({
    isDeleted: id => getDeleted(state).indexOf(id) >= 0,
    // isDisabled: form => getIsDisabled(state, form),
    isMounted: form => getIsMounted(state, form)
});
const d2p = { deletePatient };
export default consume({ store: { s2p, d2p }, styles, router: true })(
    PatientPage
);
