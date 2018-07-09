import React from 'react';
import registerPhoto from '../../resources/images/register.jpeg';
import SignupForm from '../SignupForm';

import { PageWrapper, Background } from '../../../components';
import { SIGNUP_CALLBACK_URL } from '.';

export default () => (
    <PageWrapper>
        <Background src={registerPhoto}>
            <SignupForm callbackURL={SIGNUP_CALLBACK_URL}/>
        </Background>
    </PageWrapper>
);