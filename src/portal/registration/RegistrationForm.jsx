import React from 'react';
import { Header, Container, Checkbox, Form } from 'semantic-ui-react';
import t from 'i18n';
import { connectForm, FormButton, FormTextInput, Navigation } from 'components';

const RegistrationForm = (props) => {

    const emailTxt = t("Email");
    const passTxt = t("Password");
    const registerTxt = t("Sign Up");

    const subtitleTxt = t("Easy peasy");

    const agreementTxt = t("By clicking Sign Up, you agree to our");
    const termsTxt = t("Terms");

    const btn = { form: props };

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
                <div className='terms'>
                    <span>
                        {agreementTxt}
                        &nbsp;
                            </span>
                    <Navigation to='/terms'>
                        {termsTxt}
                    </Navigation>
                </div>
                <FormButton fluid positive size="large" action="SIGNUP_REQUESTED" {...btn} >
                    {registerTxt}
                </FormButton>
            </Form>
        </Container >
    );
}

export default connectForm({ form: 'registration' })(RegistrationForm);