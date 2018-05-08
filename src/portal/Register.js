import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Checkbox, Form } from 'semantic-ui-react';
import t from 'i18n';
import { Field, reduxForm } from 'redux-form';

import { BackgroundSegment, FormButton, FormTextInput } from 'components';
import registerPhoto from 'resources/register.jpeg';

const Register = (props) => {

    const emailTxt = t("Email");
    const passTxt = t("Password");
    const registerTxt = t("Sign Up");

    const subtitleTxt = t("Easy peasy");

    const agreementTxt = t("By clicking Sign Up, you agree to our");
    const termsTxt = t("Terms");

    const btn = { form: props };

    return (
        <BackgroundSegment basic className='registration' url={registerPhoto}>
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
                        <Field name='email' component={FormTextInput} icon='user' iconPosition='left' placeholder={emailTxt} />
                    </Form.Field>
                    <Form.Field>
                        <Field name='password' component={FormTextInput} type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
                    </Form.Field>
                    <div className='terms'>
                        {agreementTxt}
                        &nbsp;
                        <Link to='/terms'>
                            {termsTxt}
                        </Link>
                    </div>
                    <FormButton fluid positive size="large" action="SIGNUP_REQUESTED" {...btn}>
                        {registerTxt}
                    </FormButton>
                </Form>
            </Container >
        </BackgroundSegment >
    );
}

export default reduxForm({ form: 'registration' })(Register);