import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Button, Checkbox, Form, Input, Image, Message } from 'semantic-ui-react';
import t from '../../i18n/i18n';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Axios from 'axios';

class Register extends Component {

    render() {
        const emailTxt = t("Email");
        const passTxt = t("Password");
        const registerTxt = t("Sign Up");

        const { onSubmit, handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <Segment basic className='registration'>
                <Container>
                    <Form size='large'>
                        <Form.Field>
                            <Field name='email' component={Input} icon='user' iconPosition='left' placeholder={emailTxt} />
                        </Form.Field>
                        <Form.Field>
                            <Field name='password' component={Input} type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
                        </Form.Field>
                        <Button onClick={handleSubmit(onSubmit)} fluid primary size="large" loading={submitting} disabled={pristine || submitting}>
                            {registerTxt}
                        </Button>
                        <Message error></Message>
                    </Form>
                </Container>
            </Segment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (values) => {
            return Axios.post("/registrations", values).then((response) => {
                // console.log(response);
                dispatch({
                    type: "REGISTERED_OK",
                    payload: response.data
                });
            }).catch((error) => {
                throw new SubmissionError({
                    // password: 'Wrong password',
                    _error: error //'Login failed!'
                })
            })
        }
    }
}

Register = connect(
    null,
    mapDispatchToProps
)(Register);

export default reduxForm({ form: 'registration' })(Register);