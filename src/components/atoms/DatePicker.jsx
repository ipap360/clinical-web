import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

export default (props) => (
    <DatePicker
        keyboard
        clearable
        format={moment().localeData().longDateFormat("L")}
        // mask={mask.split("")}
        {...props}
    />
);