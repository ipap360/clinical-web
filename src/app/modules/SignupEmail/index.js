import SignupEmail from "./SignupEmail";
import { connect2store } from "../..";

export const MODULE_NAME = "signupEmail";

// TODO
const getSignupEmail = () => "";

const s2p = (state) => ({
    email: getSignupEmail(state)
});

export default connect2store({ s2p })(SignupEmail);