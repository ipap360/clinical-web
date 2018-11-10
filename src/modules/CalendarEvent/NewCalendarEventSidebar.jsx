import React from "react";
import { consume } from "../../context";
import { TTypography } from "../../components";
import { PatientForm } from "../Patient";
import { AppBar, Toolbar, Paper, Modal, Button } from "@material-ui/core";

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
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modal}
                        onClose={this.closeModal}
                    >
                        <Paper square className={classes.modal}>
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <TTypography
                                            variant="title"
                                            color="inherit"
                                        >
                                            New Patient
                                        </TTypography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <PatientForm
                                        modal={true}
                                        className={classes.modalform}
                                        onSaveSuccess={this.onAddPatient}
                                    />
                                </Toolbar>
                            </div>
                        </Paper>
                    </Modal>
                </div>
            </>
        );
    }
}

export default consume({ router: true })(NewCalendarEventSidebar);
