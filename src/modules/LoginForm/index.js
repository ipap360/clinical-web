import LoginForm from "./LoginForm";
import { withStore } from "../../context";
import { sessionUpdated } from "../Session";

const d2p = { sessionUpdated };

export default withStore(null, d2p)(LoginForm);
