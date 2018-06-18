import React from 'react';
import { connect } from 'react-redux';
import { Header, Container, Form } from 'semantic-ui-react';
import t from 'i18n';
import { reduxForm } from 'redux-form';
import { FormButton, FormTextInput, Navigation } from 'components';
import { TERMS } from 'common/paths';
import { SIGNUP } from 'common/actions';

const RegistrationForm = ({ handleSubmit, locale, timezone, callbackURL, ...props }) => {

    const emailTxt = t("Email");
    const passTxt = t("Password");
    const registerTxt = t("Sign Up");

    const subtitleTxt = t("Easy peasy");

    const agreementTxt = t("By clicking Sign Up, you agree to our");
    const termsTxt = t("Terms");

    console.log(props);

    return (
        <Container>
            <Form size='large' style={{
                margin: "0 0 0 auto",
                width: "350px"
            }}>
                <Header as='h1'>
                    {registerTxt}
                    <Header.Subheader>{subtitleTxt}</Header.Subheader>
                </Header>
                <Form.Field>
                    <FormTextInput name='email' icon='user' iconPosition='left' placeholder={emailTxt} />
                </Form.Field>
                <Form.Field>
                    <FormTextInput name='password' type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
                </Form.Field>
                <input type='hidden' name='locale' value={locale} />
                <input type='hidden' name='timezone' value={timezone} />
                <input type='hidden' name='url' value={callbackURL} />
                <div className='terms'>
                    <span>{agreementTxt}&nbsp;</span>
                    <Navigation to={TERMS}>
                        {termsTxt}
                    </Navigation>
                </div>
                <FormButton onClick={handleSubmit} fluid positive size="large">
                    {registerTxt}
                </FormButton>
            </Form>
        </Container >
    );
}

const getSession = (state) => state.session || {};
const getTimezone = (session) => session.timezone;
const getLocale = (session) => session.locale;

const mapS2P = (state) => ({
    timezone: getTimezone(getSession(state)),
    locale: getLocale(getSession(state))
});

export default reduxForm({ form: SIGNUP })(connect(mapS2P)(RegistrationForm));