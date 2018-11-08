import React from "react";
import { withI18n, withRouter } from "../../context";
import { TTypography } from "../../components";

import CopyEventForm from "./CopyEventForm";
import classNames from "classnames";

import { AppBar, Toolbar, Paper, Modal, Button } from "@material-ui/core";

class ExistingCalendarEventSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copy: false,
            postpone: false
        };
    }

    open(modal) {
        this.setState({
            [modal]: true
        });
    }

    close() {
        this.setState({
            copy: false,
            postpone: false
        });
    }

    render() {
        const { t, classes, mainForm } = this.props;
        const ref = this;
        return (
            <>
                <div>
                    <Button
                        onClick={() => this.open("postpone")}
                        variant="contained"
                        fullWidth
                    >
                        {t("Postpone")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.postpone}
                        onClose={this.close.bind(this)}
                    >
                        <Paper
                            square
                            className={classNames(classes.modal, "short")}
                        >
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <TTypography
                                            variant="title"
                                            color="inherit"
                                        >
                                            Postpone
                                        </TTypography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <CopyEventForm
                                        mainForm={mainForm}
                                        modal={true}
                                        className={classes.modalform}
                                        save={values => {
                                            console.log(values);
                                        }}
                                        onSubmitSuccess={(...args) => {
                                            console.log(this, args);
                                            ref.close();
                                        }}
                                    />
                                </Toolbar>
                            </div>
                        </Paper>
                    </Modal>
                </div>
                <div>
                    <Button
                        onClick={() => this.open("copy")}
                        variant="contained"
                        fullWidth
                    >
                        {t("Next Appointment")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.copy}
                        onClose={this.close.bind(this)}
                    >
                        <Paper
                            square
                            className={classNames(classes.modal, "short")}
                        >
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <TTypography
                                            variant="title"
                                            color="inherit"
                                        >
                                            Next Appointment
                                        </TTypography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <CopyEventForm
                                        mainForm={mainForm}
                                        modal={true}
                                        className={classes.modalform}
                                        save={values => {
                                            console.log(values);
                                        }}
                                        onSubmitSuccess={(...args) => {
                                            console.log(this, args);
                                            ref.close();
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

export default withI18n()(withRouter(ExistingCalendarEventSidebar));
