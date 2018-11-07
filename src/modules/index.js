// import { getIsSignedIn } from "./Session";
import { withStore } from "../context";
import App from "./App";

// const MODULE_NAME = "app";

// export const FETCH_SESSION = createActionName("FETCH_SESSION");
// export const FETCH_SESSION_OK = setOK(FETCH_SESSION);

const s2p = state => ({
    // isSignedIn: getIsSignedIn(state)
});

export default withStore(s2p)(App);
