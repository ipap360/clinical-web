import { getIsSignedIn } from "../../session";
import { withStore } from "../context";
import App from "./App";

const s2p = state => ({
    isSignedIn: getIsSignedIn(state)
});

export default withStore(s2p)(App);
