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
        const { t, classes, history } = this.props;
        const ref = this;
        return (
            <div className={classes.sidebar}>
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
                        {t("Next appointment")}
                    </Button>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.copy}
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
                                            Schedule next appointment
                                        </TTypography>
                                    </Toolbar>
                                </AppBar>
                                <Toolbar>
                                    <CopyEventForm
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
                    <Button fullWidth onClick={() => history.go(-1)}>
                        {t("Back")}
                    </Button>
                </div>
            </div>
        );
    }
}

export default withI18n()(withRouter(ExistingCalendarEventSidebar));
