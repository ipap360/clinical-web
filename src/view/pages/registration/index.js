import React from 'react';

import { Link } from 'react-router-dom';
import { BackgroundSegment, LoadingMessage, SuccessMessage, FailureMessage } from 'components';

import registerPhoto from 'resources/images/register.jpeg';

import RegistrationForm from './RegistrationForm';
import RegistrationEmail from '../signup-email/SignupEmail';
import { fromQueryParams } from '../common/utils';

import { ROOT } from 'common/paths';
import { STATUS } from './index';
import { Button } from 'semantic-ui-react';
import t from 'i18n';

class Registration extends React.Component {

    CONFIRM_PARAM = "confirm";
    callbackURL = window.location.href + "?" + this.CONFIRM_PARAM + "=";

    constructor(props) {

        super(props);
        const { confirmSignup } = props;

        console.log(window.location);
        const q = fromQueryParams(window.location.search);
        console.log(q);
        if (q[this.CONFIRM_PARAM]) {
            confirmSignup(q[this.CONFIRM_PARAM]);
        }
    }

    render() {

        const { status, message } = this.props;

        if (status === STATUS.EMAIL) {
            return <RegistrationEmail message={message} />;
        }

        if (status === STATUS.COMPLETED) {
            return (
                <SuccessMessage message={message} className='full-page'>
                    <Link to={ROOT} >
                        <Button primary>
                            {t("Get Started!")}
                        </Button>
                    </Link>
                </SuccessMessage>
            );
        }

        if (status === STATUS.FAILED) {
            return <FailureMessage message={message} className='full-page' />;
        }

        if (status === STATUS.CONFIRM) {
            return (
                <LoadingMessage className='full-page' message={message} />
            );
        }

        return (
            <BackgroundSegment basic className='full-page registration-page' url={registerPhoto}>
                <div>
                    <RegistrationForm callbackURL={this.callbackURL} />
                </div>
            </BackgroundSegment >
        );
    }
}

export default Registration;