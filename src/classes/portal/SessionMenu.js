import React, { Component, Fragment } from 'react';
import { Segment, Dimmer, Loader, Button, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import MenuItem from './MenuItem';
import t from '../../i18n/i18n';
import Login from './Login';
// import axios from 'axios';

class SessionMenu extends Component {
    render() {
        const { loading, name } = this.props;

        if (loading) {
            return (<Loader size='tiny' inverted active={!!loading} inline style={{ alignSelf: 'center' }} />);
        }

        if (name == null) {
            return (
                <Fragment>
                    <Popup
                        trigger={<Button inverted content={t("Login")} />}
                        content={<Login />}
                        on='click'
                    />
                    <Button as={Link} to='/register' name='register' inverted icon>
                        {t("Sign Up")}
                    </Button>
                </Fragment>
            );
        }

        return (
            <Button.Group>
                <Button basic inverted as={Link} to='/app' name='app'>
                    <Icon name='user' />
                    {name}
                </Button>
                <Button basic inverted name='menu' icon='dropdown' />
            </Button.Group>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: !!state.root.whoamiLoading,
        name: state.root.name
    };
};

export default connect(mapStateToProps)(SessionMenu);