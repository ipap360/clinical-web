import React from 'react';
import loginPhoto from '../../resources/images/login.jpg';
import LoginForm from '../LoginForm';

import { SIGNUP } from '../paths';

import { Link, Typography, Paper, AppBar, Divider, PageImgWrapper } from '../../../components';
import styled from 'styled-components';

const Container = styled.div`
    width: 350px;
    margin: 0 auto;
`

const Pad = styled.div`
    padding: 15px 30px;
`

export default ({ t, theme }) => {
    return (
        <PageImgWrapper src={loginPhoto}>
            <Container>
                <Paper square={true}>
                    <AppBar position='static' elevation={0}>
                        <Pad>
                            <Typography color='inherit' align='center' variant='title'>
                                Log In
                            </Typography>
                        </Pad>
                    </AppBar>
                    <Pad>
                        <LoginForm />
                    </Pad>
                    <Divider />
                    <Pad>
                        <Typography align="left">
                            No account? <strong><Link to={SIGNUP}>Sign Up</Link></strong>
                        </Typography>
                    </Pad>                    
                </Paper>
            </Container>
        </PageImgWrapper>
    );
}