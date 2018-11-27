import React from "react";
import { consume } from "../../context";
import { onSavePage, onDelete } from "../../utils";
import Main from "../Main";
import { Paper, Button, Divider } from "@material-ui/core";

import {
    RichButton,
    ModalFormContainer,
    ButtonWithAlert
} from "../../components";

import TopBar from "../TopBar";
import SideBar from "../SideBar";

import { CalendarEventForm } from "../CalendarEvent";
import PatientForm from "./PatientForm";
import FormStateToRedux from "../FormStateToRedux";
import PatientTitle from "./PatientTitle";

import styles from "./styles";
import { getIsMounted, deletePatient } from "./store";

class PatientPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
    }

    patientFrmRef = React.createRef();

    openModal = () => {
        this.setState({
            modal: true
        });
    };

    closeModal = () => {
        this.setState({
            modal: false
        });
    };

    onAddAppointment = (...args) => {
        this.closeModal();
    };

    onSavePatient = onSavePage.bind(this, this.props.history);
    onDelete = onDelete.bind(this, this.props.history);

    render() {
        const {
            t,
            classes,
            history,
            match,
            isMounted,
            deletePatient
        } = this.props;

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
                        {isMounted(formName) && !isNew && (
                            <>
                                <div>
                                    <ButtonWithAlert
                                        alertTitle={t(
                                            "Are you sure you want to delete this patient?"
                                        )}
                                        alertBody="This is a non-reversible action! The patient and all related data will be deleted!"
                                        alertBodyProps={{ color: "error" }}
                                        icon="fas fa-trash-alt"
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={() => {
                                            deletePatient(patientId, {
                                                onOK: this.onDelete
                                            });
                                        }}
                                    >
                                        {t("Delete")}
                                    </ButtonWithAlert>
                                </div>
                                <div>
                                    <Button
                                        onClick={this.openModal}
                                        variant="contained"
                                        fullWidth
                                    >
                                        {t("New Appointment")}
                                    </Button>
                                    <ModalFormContainer
                                        open={this.state.modal}
                                        onClose={this.closeModal}
                                        title={t("New Appointment")}
                                    >
                                        <CalendarEventForm
                                            modal={true}
                                            id={0}
                                            suggestedValues={{
                                                patient: patientId
                                            }}
                                            // className={classes.modalform}
                                            onSaveSuccess={
                                                this.onAddAppointment
                                            }
                                        />
                                    </ModalFormContainer>
                                </div>
                            </>
                        )}
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
    isMounted: form => getIsMounted(state, form)
});
const d2p = { deletePatient };

export default consume({ store: { s2p, d2p }, styles, router: true })(
    PatientPage
);
