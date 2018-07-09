import React from 'react';
import loginPhoto from '../../resources/images/login.jpg';
import LoginForm from '../LoginForm';

import { SIGNUP } from '../paths';

import { PageWrapper, Background, Link, Typography } from '../../../components';

export default () => (
    <PageWrapper>
        <Background src={loginPhoto}>
            <LoginForm />
            <Typography>
                Don't have an account? <Link to={SIGNUP}>Sign Up</Link>
            </Typography>
        </Background>
    </PageWrapper>
)
