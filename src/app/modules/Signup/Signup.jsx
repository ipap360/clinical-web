import React from 'react';
import registerPhoto from '../../resources/images/register.jpeg';
import SignupForm from '../SignupForm';

import { PageImgWrapper, Paper, AppBar, Typography, IconButton } from '../../../components';
import { SIGNUP_CALLBACK_URL } from '.';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';

const Container = styled.div`
    width: 350px;
    margin: 0 70px 0 0;
`

const Pad = styled.div`
    padding: 15px 30px;
`

export default () => (
    <PageImgWrapper src={registerPhoto} style={{ alignItems: 'flex-end' }}>
        <IconButton color="secondary" style={{position: 'absolute', top: '8px', left: '8px', fontSize: '52px'}} size='large'>
            <Icon fontSize='inherit'>home</Icon>
        </IconButton>
        <Container>
            <Paper square={true}>
                <AppBar position='static' elevation={0}>
                    <Pad>
                        <Typography color='inherit' align='center' variant='title'>
                            Signup
                        </Typography>
                    </Pad>
                </AppBar>
                <Pad>
                    <Typography variant='subheading'>
                        It is that easy
                    </Typography>
                    <SignupForm callbackURL={SIGNUP_CALLBACK_URL} />
                </Pad>
            </Paper>
        </Container>
    </PageImgWrapper>
);