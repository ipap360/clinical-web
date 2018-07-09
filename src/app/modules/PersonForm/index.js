import connect from '../../store/connect';
import { createActionName, createAction } from '../../store/helpers';
import PersonForm from './PersonForm';

export const MODULE_NAME = 'personForm';

export const NEW_PERSON = createActionName("INSERT", MODULE_NAME);

export const newPerson = createAction(NEW_PERSON);

const d2p = { newPerson };

export default connect({ d2p, form: MODULE_NAME })(PersonForm);