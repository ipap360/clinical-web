import NewCalendarEvent, { NEW_EVENT_PERSON_FORM } from './NewCalendarEvent';
import { connect2store, registerSagas } from '../../../common';
import { NEW_PERSON_OK } from '../PersonForm';

export default connect2store()(NewCalendarEvent);

function* onNewPerson({ take }) {
    while (true) {
        const result = yield take(NEW_PERSON_OK);
        console.log(result);
    }
}

registerSagas(onNewPerson);