import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../common/api';
import { Button, Checkbox, Form, Input, Image, Message, Dimmer, Loader } from 'semantic-ui-react';
import t from '../i18n/i18n';
import axios from 'axios';

// register dataaction - url
class Register extends Component {
    constructor(props) {
        super(props);

        // initial form state
        this.state = {
            "isLoading": true,
            "fields": {},
            "buttons": {},
            "sync": ""
        }

        fetch().then((response) => {
            console.log(response);
            // const fields = _.map(response.fields, (o) => o.name);
            // const jsstate = toJS(this, response);
            // console.log(jsstate);

            // this.setState(jsstate);

        });

        // const handleChange = this.handleChange.bind(this);
        // const handleSubmit = ;

        // this.state = 
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleChange(event) {

    }

    render() {

        console.log(this.state);

        if (this.state.isLoading === true) {
            return (
            <Dimmer active inverted>
                <Loader inverted content={t("Loading")} />
              </Dimmer>
            );
        }

        const { email, password } = this.state.fields;
        const { onSubmit } = this.state.buttons;
        
        return (
            <div>
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
                                <Input {...email} icon='user' iconPosition='left' />
                            </Form.Field>
                            <Form.Field>
                                <Input {...password} icon='lock' iconPosition='left' />
                            </Form.Field>
                            <Button {...onSubmit} fluid primary size="large" />
                            <Message error></Message>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}


// register dataaction - url
// api.register('REGISTER', {
//     url: 'api/v1/registrations',
//     method: 'POST'
// });

const mapStateToProps = (state, { match }) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch
}

Register = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Register));

export default Register;