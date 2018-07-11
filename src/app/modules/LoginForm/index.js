import LoginForm from './LoginForm';

import { login } from '../../session';
import {  connect2store } from '../../../common';

export const MODULE_NAME = 'loginForm';

// connect...
const d2p = { submitActionCreator: login };

export default connect2store({ d2p, form: MODULE_NAME })(LoginForm);

