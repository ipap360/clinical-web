import React from 'react';
import { BackgroundSegment } from 'components';
import emailSentPhoto from 'resources/email-sent.jpg';

const RegistrationEmail = ({ message }) => {
    return (
        <BackgroundSegment basic className='email-sent' url={emailSentPhoto}>
            <div>
                {message}
            </div>
        </BackgroundSegment >
    );
}

export default RegistrationEmail;