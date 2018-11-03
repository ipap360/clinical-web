import React from "react";
import { withI18n } from "../../context";
import CopyEventForm from "./CopyEventForm";
import classNames from "classnames";

import {
    Sidebar,
    AppBar,
    Toolbar,
    Paper,
    Modal,
    Button
} from "@material-ui/core";

const ExistingCalendarEventSidebar = ({ t, classes }) => (
    <Sidebar className={classes.sidebar}>
        <div>
            <Button onClick={postponeModal} variant="contained" fullWidth>
                {t("Postpone")}
                {/* <i className="fas fa-forward"></i> */}
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={postponeEventModal}
                onClose={closeModals}
            >
                <Paper square className={classNames(classes.modal, "short")}>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <TTypography variant="title" color="inherit">
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
                                    closeModals();
                                }}
                            />
                        </Toolbar>
                    </div>
                </Paper>
            </Modal>
        </div>
        <div>
            <Button onClick={copyModal} variant="contained" fullWidth>
                {t("Next appointment")}
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={copyEventModal}
                onClose={closeModals}
            >
                <Paper square className={classNames(classes.modal, "short")}>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <TTypography variant="title" color="inherit">
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
                                    closeModals();
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
    </Sidebar>
);

export default withI18n()(ExistingCalendarEventSidebar);
