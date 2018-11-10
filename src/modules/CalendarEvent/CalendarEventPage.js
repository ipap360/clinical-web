import React from "react";
import { consume } from "../../context";

import Main from "../Main";
import { Paper, Button } from "@material-ui/core";

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

class CalendarEventPage extends React.Component {
    ceFrmRef = React.createRef();

    onAddPatient = (patientForm, data) => {
        // console.log(patientForm, data);
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

    render() {
        const { t, classes, history, location, match } = this.props;

        const {
            params: { id }
        } = match;

        // eslint-disable-next-line
        const calendarEventId = parseInt(id, 10);
        const isNew = calendarEventId === 0;

        const date = location.state && location.state.date;
        const formName = `calendarEvent${calendarEventId}`;

        return (
            <React.Fragment>
                <TopBar
                    sidebar={true}
                    body={<CalendarEventTitle form={formName} isNew={isNew} />}
                />
                <SideBar>
                    <div className={classes.sidebar}>
                        {isNew ? (
                            <NewCalendarEventSidebar
                                classes={classes}
                                onAddPatient={this.onAddPatient}
                            />
                        ) : (
                            <ExistingCalendarEventSidebar
                                classes={classes}
                                mainForm={formName}
                            />
                        )}
                        <div>
                            <Button fullWidth onClick={() => history.go(-1)}>
                                {t("Back")}
                            </Button>
                        </div>
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
                        >
                            <FormStateToRedux form={formName} />
                        </CalendarEventForm>
                    </Paper>
                </Main>
            </React.Fragment>
        );
    }
}

const d2p = { fetchPatients };
const opts = { withRef: true };
export default consume({ store: { d2p, opts }, styles, router: true })(
    CalendarEventPage
);
