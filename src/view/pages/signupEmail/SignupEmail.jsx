import React from 'react';

import photo from '../resources/images/email-sent.jpg';
import { Paper, Typography, FullPage } from '../../atoms';

export default ({ email }) => (
    <FullPage>
        <Paper>
            <img src={photo} />
            <Typography variant='display3'>
                Check your Email
            </Typography>
            <Typography variant='display1'>
                We sent an email to <strong>{{ email }}</strong> so we can confirm you're you.
                Click the link provided in the email to continue.
            </Typography>
        </Paper>
    </FullPage>
);
