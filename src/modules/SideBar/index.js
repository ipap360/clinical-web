import SideBar from "./SideBar";
// import { createActionName, createAction } from "../../helpers";
import { connect2store } from "../../../common";
// import { getIsSidebarOpen } from "../Main";

export const MODULE_NAME = "sidebar";

// connect
const s2p = (state) => ({
    // open: getIsSidebarOpen(state)
});

export default connect2store({ s2p })(SideBar);