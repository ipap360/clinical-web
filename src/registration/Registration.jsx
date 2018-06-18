import React from 'react';
import { Redirect } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { BackgroundSegment } from 'components';

import registerPhoto from 'resources/register.jpeg';

import RegistrationForm from './RegistrationForm';
import RegistrationEmail from './RegistrationEmail';
import { fromQueryParams } from 'common/utils';

import { ROOT } from 'common/paths';
import { Dimmer } from 'semantic-ui-react';
import { STATUS } from './index';

class Registration extends React.Component {

    CONFIRM_PARAM = "confirm";
    callbackURL = window.location.href + "?" + this.CONFIRM_PARAM + "=";

    constructor(props) {
        super(props);
        const { confirmSignup } = props;

        const q = fromQueryParams(window.location.search);
        if (q[this.CONFIRM_PARAM]) {
            confirmSignup(q[this.CONFIRM_PARAM]);
        }
    }

    render() {

        const { status, message } = this.props;

        // console.log(message);

        if (status === STATUS.EMAIL) {
            return <RegistrationEmail message={message} />;
        }

        if (status === STATUS.COMPLETED) {
            return <Redirect to={ROOT} />;
        }

        const isDimmed = status === STATUS.CONFIRM;
        // console.log("dimmed?", isDimmed)

        return (
            <Dimmer.Dimmable dimmed={isDimmed}>
                <BackgroundSegment basic className='registration-page' url={registerPhoto}>
                    <div>
                        <RegistrationForm callbackURL={this.callbackURL} />
                    </div>
                </BackgroundSegment >
                <Dimmer active={isDimmed}>
                    <Icon name='circle notched' loading={true} size='huge'/>
                    <div>{message}</div>
                </Dimmer>
            </Dimmer.Dimmable>
        );
    }
}

export default Registration;
