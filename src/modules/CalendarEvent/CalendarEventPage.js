import React from "react";
import { Redirect } from "react-router";
import { consume } from "../../context";
import { onSavePage } from "../../utils";

import Main from "../Main";
import { Paper, Button, Divider } from "@material-ui/core";

import { RichButton, TTypography } from "../../components";

import TopBar from "../TopBar";
import SideBar from "../SideBar";

import CalendarEventForm from "./CalendarEventForm";
import FormStateToRedux from "../FormStateToRedux";
import CalendarEventTitle from "./CalendarEventTitle";
import NewCalendarEventSidebar from "./NewCalendarEventSidebar";
import ExistingCalendarEventSidebar from "./ExistingCalendarEventSidebar";

import { fetchPatients } from "../PatientsList";

import styles from "./styles";
import { getIsDisabled, getIsMounted } from "./store";

class CalendarEventPage extends React.Component {
    ceFrmRef = React.createRef();

    onSaveCalendarEvent = onSavePage.bind(this, this.props.history);

    onAddPatient = (patientForm, data) => {
        const ref = this.ceFrmRef.current;
        if (ref != null) {
            const innerRef = ref.form.current;
            if (innerRef) {
                innerRef.setValue("patient", data.id);
                this.props.fetchPatients();
            }
        }
    };

    onCopyOrPostpone = (copyForm, data) => {
        const ref = this.ceFrmRef.current;
        if (ref != null) {
            const innerRef = ref.form.current;
            if (innerRef) {
                innerRef.load();
            }
        }
    };

    render() {
        const {
            t,
            classes,
            history,
            location,
            match,
            isDisabled,
            isMounted
        } = this.props;

        const {
            params: { id }
        } = match;

        // eslint-disable-next-line
        const calendarEventId = parseInt(id, 10);

        const isNew = calendarEventId === 0;

        const date = location.state && location.state.date;
        const patient = location.state && location.state.patient;

        const formName = `calendarEvent${calendarEventId}`;

        return (
            <React.Fragment>
                <TopBar
                    sidebar={true}
                    title="Appointments"
                    body={<CalendarEventTitle form={formName} isNew={isNew} />}
                />
                <SideBar>
                    <div className={classes.sidebar}>
                        <div>
                            <RichButton
                                icon="fas fa-arrow-left"
                                fullWidth
                                onClick={() => history.go(-1)}
                                variant="outlined"
                            >
                                {t("Back")}
                            </RichButton>
                        </div>
                        <Divider />
                        {isMounted(formName) &&
                            (isNew ? (
                                <NewCalendarEventSidebar
                                    classes={classes}
                                    onAddPatient={this.onAddPatient}
                                />
                            ) : (
                                <ExistingCalendarEventSidebar
                                    classes={classes}
                                    calendarEventId={calendarEventId}
                                    mainForm={formName}
                                    onCopyOrPostpone={this.onCopyOrPostpone}
                                />
                            ))}
                    </div>
                </SideBar>
                <Main sidebar={true}>
                    <Paper square className={classes.mainPaper}>
                        <CalendarEventForm
                            className={classes.form}
                            onSaveSuccess={this.onSaveCalendarEvent}
                            id={calendarEventId}
                            suggestedValues={{
                                ...(date ? { date } : null),
                                ...(patient ? { patient } : null)
                            }}
                            ref={this.ceFrmRef}
                            disabled={isDisabled(formName)}
                        >
                            <FormStateToRedux form={formName} />
                        </CalendarEventForm>
                    </Paper>
                </Main>
            </React.Fragment>
        );
    }
}

const s2p = state => ({
    isDisabled: form => getIsDisabled(state, form),
    isMounted: form => getIsMounted(state, form)
});
const d2p = { fetchPatients };

export default consume({
    store: { s2p, d2p },
    styles,
    router: true,
    ref: true
})(CalendarEventPage);
