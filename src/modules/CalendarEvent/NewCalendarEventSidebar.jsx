import React from "react";
import { withI18n, withRouter } from "../../context";
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

    openModal() {
        this.setState({
            modal: true
        });
    }

    closeModal() {
        this.setState({
            modal: false
        });
    }

    render() {
        const { t, classes } = this.props;
        const ref = this;
        return (
            <>
                <div>
                    <Button
                        onClick={this.openModal.bind(this)}
                        variant="contained"
                        fullWidth
                    >
                        {t("New Patient")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modal}
                        onClose={this.closeModal.bind(this)}
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
                                        onSubmitSuccess={args => {
                                            console.log(this, ref, args);
                                            ref.closeModal();
                                        }}
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

export default withI18n()(withRouter(NewCalendarEventSidebar));
