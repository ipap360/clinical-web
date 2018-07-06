import React from 'react';

import { BackgroundSegment, Navigation } from 'components';
import loginPhoto from 'resources/login.jpg';

import LoginForm from './LoginForm';
import { SIGNUP } from 'common/paths';

import t from 'i18n';

const Login = () => {

    const noAccountTxt = t("Don't have an account?");
    const signupTxt = t("Sign Up");

    return (
        <BackgroundSegment basic className='full-page login-page' url={loginPhoto}>
            <div>
                <LoginForm />
                <div>
                    <span>{noAccountTxt}&nbsp;</span>
                    <Navigation to={SIGNUP}>
                        {signupTxt}
                    </Navigation>
                </div>
            </div>
        </BackgroundSegment>
    );
}

export default Login;