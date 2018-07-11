import Main from './Main';

import { getIsSignedIn } from '../../session';
import { connect2store } from '../../../common';

// name
export const MODULE_NAME = 'main';

// connect
const s2p = (state) => ({
    isSignedIn: getIsSignedIn(state)
});

// const d2p = { logout };

export default connect2store({ s2p })(Main);
