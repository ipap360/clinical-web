import React from "react";
import { consume } from "../../context";
import { ModalFormContainer } from "../../components";
import { PatientForm } from "../Patient";
import { Button } from "@material-ui/core";

class NewCalendarEventSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

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

    onAddPatient = (...args) => {
        this.closeModal();
        const { onAddPatient } = this.props;
        if (typeof onAddPatient === "function") onAddPatient(...args);
    };

    render() {
        const { t, classes } = this.props;
        return (
            <>
                <div>
                    <Button
                        onClick={this.openModal}
                        variant="contained"
                        fullWidth
                    >
                        {t("New Patient")}
                    </Button>
                    <ModalFormContainer
                        open={this.state.modal}
                        onClose={this.closeModal}
                        title={t("New Patient")}
                    >
                        <PatientForm
                            modal={true}
                            className={classes.modalform}
                            onSaveSuccess={this.onAddPatient}
                        />
                    </ModalFormContainer>
                </div>
            </>
        );
    }
}

export default consume({ router: true })(NewCalendarEventSidebar);
