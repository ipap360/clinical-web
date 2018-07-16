import moment from 'moment';
import { date } from '../../utils';
import { registerReducer, connect2store } from '../../../common';
import Home from './Home';

const MODULE_NAME = "calendar";

const today = date.midnight(new Date());

const dates = [];

for (let i = 1; i < 8; i++) {
    let loopdate = new Date(today);
    loopdate.setUTCDate(today.getUTCDate() - today.getUTCDay() + i);
    dates.push(loopdate);
}

const state0 = {
    calendar: {
        dates: dates.map(d => ({
            number: d.getUTCDate(),
            text: moment.utc(d).format("ddd")
        }))
    }
}

const reducer = (state = state0, { type, payload }) => {
    return state;
}

registerReducer(MODULE_NAME, reducer);

export const getCalendarDates = (state) => state[MODULE_NAME].calendar.dates;

const s2p = (state) => ({
    dates: getCalendarDates(state)
});

export default connect2store({ s2p })(Home);