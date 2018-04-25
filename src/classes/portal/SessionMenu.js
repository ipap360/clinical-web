import React, { Component, Fragment } from 'react';
import { Segment, Dimmer, Loader, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import MenuItem from './MenuItem';
import t from '../../i18n/i18n';
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
                    <Button as={Link} to='/login' name='login' inverted>
                        {t("Login")}
                    </Button>
                    <Button as={Link} to='/register' name='register' inverted>
                        {t("Sign Up")}
                    </Button>                    
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Link to='/app/profile' name='profile'>
                    {name}
                </Link>
                <Button as={Link} to='/app' name='app'>
                    {t("Enter")}
                </Button>
            </Fragment>
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