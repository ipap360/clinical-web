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
        const { t, classes, history } = this.props;
        const ref = this;
        return (
            <div className={classes.sidebar}>
                <div>
                    <Button
                        onClick={this.openModal.bind(this)}
                        variant="contained"
                        fullWidth
                    >
                        {t("Add new patient")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modal}
                    >
                        <Paper square className={classes.modal}>
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <TTypography
                                            variant="title"
                                            color="inherit"
                                        >
                                            Add new patient
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
                <div>
                    <Button fullWidth onClick={() => history.go(-1)}>
                        {t("Back")}
                    </Button>
                </div>
            </div>
        );
    }
}

export default withI18n()(withRouter(NewCalendarEventSidebar));
