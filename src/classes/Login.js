import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { } from 'semantic-ui-react';
import api from '../common/api';
import { Button, Checkbox, Form, Input, Image, Message } from 'semantic-ui-react';
import t from '../i18n/i18n';
import loginPhoto from '../resources/login-photo.jpg';

// register dataaction - url
class Login extends Component {

    componentDidMount() {
        const { loadData } = this.props;
        loadData();
    }

    render() {
        // i18n
        const emailTxt = t("Email");
        const passTxt = t("Password");
        const loginTxt = t("Login");
        const forgotTxt = t("Forgot your password?");
        const newToUsTxt = t("New to us?");
        const registerTxt = t("Sign Up");

        return (
            <React.Fragment>
                <div style={{
                    backgroundImage: `url(${loginPhoto})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    opacity: 0.3,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0
                }}></div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'calc(100vh - 47px)'
                }}>
                    <div style={{
                        width: '640px'
                    }}>
                        <Form size='large'>
                            <Form.Field>
                                <Input icon='user' iconPosition='left' placeholder={emailTxt} />
                            </Form.Field>
                            <Form.Field>
                                <Input type="password" icon='lock' iconPosition='left' placeholder={passTxt} />
                            </Form.Field>
                            <Button fluid primary size="large">
                                {loginTxt}
                            </Button>
                            <Message error></Message>
                        </Form>
                        <Message>
                            {newToUsTxt}
                            &nbsp;
                            &nbsp;
                            <Link to={"/register"}>
                                {registerTxt}
                            </Link>
                        </Message>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, { match }) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (...args) => {

        }
    }
}

Login = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));

export default Login;