import React, { Component, Fragment } from 'react';
import { Segment, Dimmer, Loader, Button, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import t from 'i18n';
import Login from './Login';

class SessionMenu extends Component {
    render() {
        const { loading, name, login, openLogin, closeLogin, namespace } = this.props;

        if (loading) {
            return (<Loader size='tiny' inverted active={!!loading} inline style={{ alignSelf: 'center' }} />);
        }

        let popup;
        if (namespace == 'header') {
            popup = (<Popup
                trigger={<Button inverted content={t("Login")} />}
                content={<Login />}
                on='click'
                open={login}
                onClose={closeLogin}
                onOpen={openLogin}
            />)
        } else {
            popup = (<Popup
                trigger={<Button inverted content={t("Login")} />}
                content={<Login />}
                on='click'
            />)
        }

        if (name == null) {
            return (
                <Fragment>
                    {popup}
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
        name: state.root.name,
        login: state.root.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openLogin: () => {
            dispatch({
                type: "OPEN_LOGIN"
            });
        },
        closeLogin: () => {
            dispatch({
                type: "CLOSE_LOGIN"
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionMenu);