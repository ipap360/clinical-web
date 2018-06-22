import React from 'react';

import { Container, Header, Image, Segment } from 'semantic-ui-react'
import emailSentPhoto from 'resources/email-sent.jpg';
import t from 'i18n';

const RegistrationEmail = ({ message }) => {
    return (
        <Segment basic className='full-page' >
            <Container text>
                <Image src={emailSentPhoto} fluid />
                <Header size='huge'>{t("Check your Email")}</Header>
                <Header size='small'>
                    {t("We sent an email to %s so we can confirm you're you. Click the link provided in the email to continue.", message)}
                </Header>
            </Container>
        </Segment >
    );
}

export default RegistrationEmail;