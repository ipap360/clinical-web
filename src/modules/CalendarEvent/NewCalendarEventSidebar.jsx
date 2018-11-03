import React from "react";
import { withI18n } from "../../context";
import { PatientForm } from "../Patients";
import {
    Sidebar,
    AppBar,
    Toolbar,
    Paper,
    Modal,
    Button
} from "@material-ui/core";

const NewCalendarEventSidebar = ({ t, classes }) => (
    <Sidebar className={classes.sidebar}>
        <div>
            <Button onClick={newPersonModal} variant="contained" fullWidth>
                {t("Add new patient")}
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={newPatientModal}
                onClose={closeModals}
            >
                <Paper square className={classes.modal}>
                    <div>
                        <AppBar position="static">
                            <Toolbar>
                                <TTypography variant="title" color="inherit">
                                    Add new patient
                                </TTypography>
                            </Toolbar>
                        </AppBar>
                        <Toolbar>
                            <PatientForm
                                modal={true}
                                className={classes.modalform}
                                onSubmitSuccess={(result, dispatch, props) => {
                                    console.log(result, dispatch, props);
                                    // closeModals();
                                }}
                            />
                        </Toolbar>
                    </div>
                </Paper>
            </Modal>
        </div>
        <div>
            <Button fullWidth onClick={() => history.go(-1)}>
                {/* <Icon style={{marginRight: 8}}>arrow_back_ios</Icon> */}
                {t("Back")}
            </Button>
        </div>
    </Sidebar>
);

export default withI18n()(NewCalendarEventSidebar);
