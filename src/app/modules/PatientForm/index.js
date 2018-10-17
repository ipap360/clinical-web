import PersonForm from "./PatientForm";
import { connect2store, registerSagas } from "../../../common";
import { createActionName, createAction, setOK } from "../../helpers";
import { save } from "../../api/patients";
import { apiSaga } from "../../session";
import { data } from "../../utils";

export const MODULE_NAME = "personForm";

export const SAVE_PATIENT = createActionName("SAVE", MODULE_NAME);
export const SAVE_PATIENT_OK = setOK(SAVE_PATIENT);

export const savePatient = createAction(SAVE_PATIENT);

const s2p = state => ({
    birthYears: data
        .range2array(1910, new Date().getFullYear())
        .map(y => ({ value: y, label: y }))
});

const d2p = {
    // submitActionCreator: savePatient
};

export default connect2store({
    s2p,
    d2p,
    form: {
        name: MODULE_NAME,
        onSubmit: savePatient
    }
})(PersonForm);

// sagas
function* personFormListeners({ takeEvery }) {
    yield takeEvery(SAVE_PATIENT, apiSaga, save);
}

registerSagas(personFormListeners);
