import React from 'react';

import emailSentPhoto from '../resources/images/email-sent.jpg';
import { Typography, FullPage } from '../../atoms';

export default ({ email }) => (
    <FullPage>
        <Container text>
            <img src={emailSentPhoto} />
            <Typography variant='display3'>
                Check your Email
            </Typography>
            <Typography variant='display1'>
                We sent an email to <strong>{{ email }}</strong> so we can confirm you're you.
                Click the link provided in the email to continue.
            </Typography>
        </Container>
    </FullPage>
);
