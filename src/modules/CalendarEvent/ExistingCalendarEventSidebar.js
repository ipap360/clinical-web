import React from "react";
import classNames from "classnames";
import { consume } from "../../context";
import {
    ModalFormContainer,
    ButtonWithAlert,
    RichButton,
    TTypography,
    Link
} from "../../components";
import { CALENDAR_EVENT } from "../routes";
import CopyEventForm from "./CopyEventForm";

import { Divider, Typography } from "@material-ui/core";

import { calendarEvents } from "../../api";
import { deleteEvent, getIsPostponed, getIsCopied, getOriginal } from "./store";
import moment from "moment";

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

    onCopyOrPostpone = (...args) => {
        this.close();
        const { onCopyOrPostpone } = this.props;
        if (typeof onCopyOrPostpone === "function") onCopyOrPostpone(...args);
    };

    render() {
        const {
            t,
            classes,
            calendarEventId,
            mainForm,
            deleteEvent,
            isPostponed,
            isCopied,
            original
        } = this.props;
        const ref = this;

        if (isCopied) {
            return (
                <div>
                    <div
                        className={classNames(
                            classes.sideMsg,
                            classes.sideCopied
                        )}
                    >
                        <Typography color="inherit">
                            {t("The next appointment has been scheduled")}
                        </Typography>
                        <br />
                        <i className="fas fa-check" />
                    </div>
                </div>
            );
        }

        if (isPostponed) {
            return (
                <div>
                    <div
                        className={classNames(
                            classes.sideMsg,
                            classes.sidePostponed
                        )}
                    >
                        <Typography color="inherit">
                            {t("This appointment has been postponed")}
                        </Typography>
                        <br />
                        <i className="fas fa-calendar-plus" />
                    </div>
                </div>
            );
        }

        const date = original.date && moment(original.date).format("L");

        return (
            <>
                <div>
                    <RichButton
                        onClick={() => this.open("copy")}
                        variant="contained"
                        fullWidth
                        iconPosition="right"
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
                            save={(id, values) => {
                                return calendarEvents.copy(
                                    calendarEventId,
                                    values
                                );
                            }}
                            onSaveSuccess={this.onCopyOrPostpone}
                        />
                    </ModalFormContainer>
                </div>
                <div>
                    <RichButton
                        onClick={() => this.open("postpone")}
                        variant="contained"
                        fullWidth
                        disabled={original && original.id}
                    >
                        {t("Postpone")}
                    </RichButton>
                    {original && original.id && (
                        <Link to={CALENDAR_EVENT.replace(":id", original.id)}>
                            <TTypography align="center" color="error">
                                Originally scheduled for {{ date }}
                            </TTypography>
                        </Link>
                    )}
                    <ModalFormContainer
                        open={this.state.postpone}
                        onClose={this.close}
                        title={t("Postpone")}
                    >
                        <CopyEventForm
                            mainForm={mainForm}
                            modal={true}
                            save={(id, values) =>
                                calendarEvents.postpone(calendarEventId, values)
                            }
                            onSaveSuccess={this.onCopyOrPostpone}
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

const s2p = (state, { mainForm }) => ({
    isPostponed: getIsPostponed(state, mainForm),
    isCopied: getIsCopied(state, mainForm),
    original: getOriginal(state, mainForm)
});
const d2p = { deleteEvent };
const store = { s2p, d2p };

export default consume({ router: true, store })(ExistingCalendarEventSidebar);
