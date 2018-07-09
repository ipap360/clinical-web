import React from 'react';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import moment from 'moment';

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

export default (Component) => (props) => (
    <MuiPickersUtilsProvider utils={MomentUtils} moment={moment} locale={moment.locale()}>
        <Component {...props} />
    </MuiPickersUtilsProvider>
);