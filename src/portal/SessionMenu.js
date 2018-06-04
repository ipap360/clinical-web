import React, { Component, Fragment } from 'react';
import { Segment, Dimmer, Loader, Button, Icon, Popup, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

import t from 'i18n';
import Login from './Login';

class SessionMenu extends Component {

    // toURL() {
    //     this.props.history.push(path);
    // }

    render() {
        const { loading, name, login, logout, openLogin, closeLogin, namespace } = this.props;

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

        const css = ['icon']
        if (namespace === 'header') {
            css.push('inverted');
        } else {
            css.push('borderless');
        }

        return (
            <Dropdown icon='user' labeled text={name} floating button basic className={css.join(" ")}>
                <Dropdown.Menu>
                    <Dropdown.Item text={t("Home")} as={Link} to='/app' />
                    <Dropdown.Item text={t("Profile")} as={Link} to='/app/profile' />
                    <Dropdown.Divider />
                    <Dropdown.Item text={t("Sign out")} onClick={logout} />
                </Dropdown.Menu>
            </Dropdown>
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

const mapDispatchToProps = (dispatch, ...args) => {
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
        },
        logout: () => {
            dispatch({
                type: "PURGE_TOKENS"
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionMenu);