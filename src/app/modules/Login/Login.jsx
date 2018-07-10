import React from 'react';
import loginPhoto from '../../resources/images/login.jpg';
import LoginForm from '../LoginForm';

import { SIGNUP } from '../paths';

import { PageWrapper, BackgroundImage, Link, Typography, Paper, AppBar, Divider } from '../../../components';
import styled from 'styled-components';

const LoginContainer = styled.div`
    width: 350px;
    margin: 0 auto;
`

const Spacer = styled.div`
    padding: 15px 30px;
`;

export default ({ t, theme }) => {
    return (
        <BackgroundImage src={loginPhoto} style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <LoginContainer>
                <Paper square={true}>
                    <AppBar position='static' elevation={0}>
                        <Spacer>
                            <Typography color='inherit' align='center' variant='title'>
                                Log In
                            </Typography>
                        </Spacer>
                    </AppBar>
                    <Spacer>
                        <LoginForm />
                    </Spacer>
                    <Divider />
                    <Spacer>
                        <Typography>
                            Don't have an account? <Link to={SIGNUP}>Sign Up</Link>
                        </Typography>
                    </Spacer>
                </Paper>
            </LoginContainer>
        </BackgroundImage>
    );
}