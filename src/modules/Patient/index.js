import PatientPage from "./PatientPage";
import { withStore } from "../../context";
export { default as PatientForm } from "./PatientForm";

export default withStore()(PatientPage);
