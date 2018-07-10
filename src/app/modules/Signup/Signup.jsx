import React from 'react';
import registerPhoto from '../../resources/images/register.jpeg';
import SignupForm from '../SignupForm';

import { PageWrapper, BackgroundImage } from '../../../components';
import { SIGNUP_CALLBACK_URL } from '.';

export default () => (
    <BackgroundImage src={registerPhoto}>
        <SignupForm callbackURL={SIGNUP_CALLBACK_URL} />
    </BackgroundImage>
);