import { withStore } from "../../context";
import TopBar from "./TopBar";

// import { logout, getName } from "../Session";

// name
export const MODULE_NAME = "topbar";

// connect
const s2p = state => ({
    // name: getName(state)
});

const d2p = {
    // logout
};

export default withStore(s2p, d2p)(TopBar);
