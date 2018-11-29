import React, { Component } from "react";
import { Button, Divider } from "@material-ui/core";

import {
    RichButton,
    ModalFormContainer,
    ButtonWithAlert
} from "../../components";
import { onDelete } from "../../utils";
import { consume } from "../../context";

import SideBar from "../SideBar";
import { CalendarEventForm } from "../CalendarEvent";
import styles from "./styles";
import { getIsMounted, deletePatient } from "./store";

class PatientSideBar extends Component {
    state = { modal: false };

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

    onDelete = onDelete.bind(this, this.props.history);

    render() {
        const {
            t,
            classes,
            history,
            formName,
            patientId,
            isMounted,
            deletePatient
        } = this.props;

        return (
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
                    {isMounted(formName) && patientId !== 0 && (
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
                                        onSaveSuccess={this.onAddAppointment}
                                    />
                                </ModalFormContainer>
                            </div>
                        </>
                    )}
                </div>
            </SideBar>
        );
    }
}

const s2p = state => ({
    isMounted: form => getIsMounted(state, form)
});
const d2p = { deletePatient };

export default consume({ store: { s2p, d2p }, styles, router: true })(
    PatientSideBar
);
