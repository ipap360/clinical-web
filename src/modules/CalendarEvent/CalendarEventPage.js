import React from "react";
import { Redirect } from "react-router";
import { consume } from "../../context";

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

import { ROOT } from "../routes";

import styles from "./styles";
import { getDeleted, getIsDisabled, getIsMounted } from "./store";

class CalendarEventPage extends React.Component {
    ceFrmRef = React.createRef();

    onAddPatient = (patientForm, data) => {
        const ref = this.ceFrmRef.current;
        if (ref != null) {
            const calendarEventForm = ref.getWrappedInstance();
            const innerRef = calendarEventForm.form.current;
            if (innerRef) {
                innerRef.setValue("patient", data.id);
                this.props.fetchPatients();
            }
        }
    };

    onCopyOrPostpone = (copyForm, data) => {
        const ref = this.ceFrmRef.current;
        if (ref != null) {
            const calendarEventForm = ref.getWrappedInstance();
            const innerRef = calendarEventForm.form.current;
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
            isDeleted,
            isDisabled,
            isMounted,
            caller = "/"
        } = this.props;

        const {
            params: { id }
        } = match;

        // eslint-disable-next-line
        const calendarEventId = parseInt(id, 10);

        if (isDeleted(calendarEventId)) {
            return <Redirect to={caller} />;
        }

        const isNew = calendarEventId === 0;

        const date = location.state && location.state.date;
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
                    <Paper square className={classes.paper}>
                        <CalendarEventForm
                            className={classes.form}
                            onSaveSuccess={args => {
                                history.push(ROOT);
                            }}
                            id={calendarEventId}
                            suggestedValues={{
                                ...(date ? { date } : null)
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
    isDeleted: id => getDeleted(state).indexOf(id) >= 0,
    isDisabled: form => getIsDisabled(state, form),
    isMounted: form => getIsMounted(state, form)
});
const d2p = { fetchPatients };
const opts = { withRef: true };
export default consume({ store: { s2p, d2p, opts }, styles, router: true })(
    CalendarEventPage
);
