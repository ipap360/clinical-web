import { getIsSignedIn } from '../../session';
import { connect2store, registerReducer } from '../../../common';
import { createAction, createActionName } from '../../helpers';

import Main from './Main';

// name
export const MODULE_NAME = 'main';

// action name
export const TOGGLE_SIDEBAR = createActionName("TOGGLE_SIDEBAR");

// action creator
export const toggleSidebar = createAction(TOGGLE_SIDEBAR);

const state0 = {
    isSidebarOpen: true
};

const reducer = (state = state0, { type, payload }) => {
    switch (type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen
            };
        default:
            return state;
    }
};

registerReducer(MODULE_NAME, reducer);

// selectors
export const getIsSidebarOpen = (state) => !!state[MODULE_NAME].isSidebarOpen;

// connect
const s2p = (state) => ({
    isSignedIn: getIsSignedIn(state),
    isSidebarOpen: getIsSidebarOpen(state)
});

 const d2p = { toggleSidebar };

export default connect2store({ s2p, d2p })(Main);
