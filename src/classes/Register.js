import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { } from 'semantic-ui-react';
import api from '../common/api';
import { Button, Checkbox, Form, Input, Image, Message } from 'semantic-ui-react';
import t from '../i18n/i18n';
import axios from 'axios';

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const method = (obj) => {
    return _.partial(axios[obj.method], obj.url);
}

const fetch = () => delay(3000).then(() => {
    return {
        // 'submit': '',
        'actions': {
            onSubmit: {
                url: '/mplampla/',
                method: 'post',
                content: 'Sign Up'
            }
        },
        'sync': '',
        'fields': {
            'email': {
                name: 'email',
                value: '',
                type: 'text',
                placeholder: t('Email'),
                // onChange: handleChange,
                maxLength: '255',
                sync: true
            },
            'password': {
                name: 'password',
                value: '',
                type: 'password',
                placeholder: t('Password'),
                // onChange: handleChange,
                maxLength: '255',
                sync: true
            },
            // {
            //     // type: 'submit',
            //     content: t('Sign Up'),
            //     onClick: (() => {
            //         const { doRegister } = this.props;
            //         doRegister(this.state);
            //     }).bind(this)
            // }
        }
    };
});

const toJS = (comp, form) => {
    let f = Object.assign({}, form);
    _.each(f.actions, (v, k) => {
        v.onClick = (event) => {
            console.log(event);
            const req = method(v);
            req(comp.state).then((response) => {
                
            }).catch((error) => {
                console.log(error);
            })
            // this.props.dispatch(method(v)(this.state.form));
        }
    });
    
    _.each(f.fields, (v, k) => {
        v.onChange = (event) => {
            const target = event.target;
            const name = target.name;
            comp.setState({
                ...comp.state,
                form: {
                    ...comp.state.form,
                    fields: {
                        ...comp.state.form.fields,
                        [name]: {
                            ...comp.state.form.fields[name], 
                            value: target.value
                        }
                    }
                }
            });
        }
    });

    return f;
}

// register dataaction - url
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "form": {
                "fields": {},
                "actions": {},
                "sync": ""
            }
        }

        fetch().then((response) => {
            // const fields = _.map(response.fields, (o) => o.name);

            console.log(toJS(this, response));

            this.setState({
                // form: toJS(this, response),
            });

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
        const { email, password } = this.state.form.fields;
        const { onSubmit } = this.state.form.actions;
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