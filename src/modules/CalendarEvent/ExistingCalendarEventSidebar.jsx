import React from "react";
import { consume } from "../../context";
import {
    ModalFormContainer,
    ButtonWithAlert,
    RichButton
} from "../../components";

import CopyEventForm from "./CopyEventForm";

import { Divider } from "@material-ui/core";
import { deleteEvent } from "./store";

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

    close = () => {
        this.setState({
            copy: false,
            postpone: false
        });
    };

    render() {
        const {
            t,
            classes,
            calendarEventId,
            mainForm,
            deleteEvent
        } = this.props;
        const ref = this;
        return (
            <>
                <div>
                    <RichButton
                        onClick={() => this.open("postpone")}
                        variant="contained"
                        fullWidth
                    >
                        {t("Postpone")}
                    </RichButton>
                    <ModalFormContainer
                        open={this.state.postpone}
                        onClose={this.close}
                        title={t("Postpone")}
                    >
                        <CopyEventForm
                            mainForm={mainForm}
                            modal={true}
                            save={values => {
                                console.log(values);
                            }}
                            onSaveSuccess={(...args) => {
                                ref.close();
                            }}
                        />
                    </ModalFormContainer>
                </div>
                <div>
                    <RichButton
                        onClick={() => this.open("copy")}
                        variant="contained"
                        fullWidth
                    >
                        {t("Next Appointment")}
                    </RichButton>
                    <ModalFormContainer
                        open={this.state.copy}
                        onClose={this.close.bind(this)}
                        title={t("Next Appointment")}
                    >
                        <CopyEventForm
                            mainForm={mainForm}
                            modal={true}
                            className={classes.modalform}
                            save={values => {
                                console.log(values);
                            }}
                            onSaveSuccess={(...args) => {
                                ref.close();
                            }}
                        />
                    </ModalFormContainer>
                </div>
                <Divider />
                <div>
                    <ButtonWithAlert
                        alertTitle={t(
                            "Are you sure you want to delete this appointment?"
                        )}
                        icon="fas fa-trash-alt"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                            deleteEvent(calendarEventId);
                        }}
                    >
                        {t("Delete")}
                    </ButtonWithAlert>
                </div>
            </>
        );
    }
}

const store = { d2p: { deleteEvent } };

export default consume({ router: true, store })(ExistingCalendarEventSidebar);
