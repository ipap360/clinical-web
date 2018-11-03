import { withStore } from "../../context";
import { fetchPatients, getPatients } from "../PatientsList";
import CalendarEventForm from "./CalendarEventForm";

const s2p = state => ({
    // title: getCalendarEventTitle(state),
    patients: getPatients(state).map(p => ({
        value: p.id,
        label: [p.name, p.code, p.notes].join(" ")
    }))
});

const d2p = {
    fetchPatients
};

export default withStore(s2p, d2p)(CalendarEventForm);
