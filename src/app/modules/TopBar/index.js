import TopBar from './TopBar';

import { logout, getName } from '../../session';
import { connect2store } from '../../../common';
import { getCalendarDates } from '../Home';
import { withRouter } from 'react-router';

// name
export const MODULE_NAME = 'topbar';

// connect
const s2p = (state) => ({
    name: getName(state),
    // dates: getCalendarDates(state)
});

const d2p = { logout };

export default withRouter(connect2store({ s2p, d2p })(TopBar));