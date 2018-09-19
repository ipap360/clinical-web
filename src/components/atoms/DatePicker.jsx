import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

export default ({ value, ...props }) => {
    return (
        <DatePicker
            keyboard
            clearable
            format={moment().localeData().longDateFormat("L")}
            value={value && moment(value)}
            // mask={mask.split("")}
            {...props}
        />
    );
}