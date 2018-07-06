import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

// import { PageContainer, PageHeader, HeaderContainer } from './Layout';
import Footer from './Footer';

import Login from './login';
import Home from './home';
import Profile from './profile';
import CalendarEvent from './calendarEvent';
import t from 'i18n';
import { Dropdown, Button, Image } from 'semantic-ui-react';
import { LOGOUT } from 'common/actions';
// import Settings f;rom './settings';
import { Img } from 'components/elements';
import logo from 'resources/logo.png';

// import {ActionLoader} from 'components';

export default (props) => {

    // console.log(props);
    const { isSignedIn, name, logout } = props;

    if (!isSignedIn) return <Login />;

    return (
        <div id='page-wrapper'>
            <div id='page-header' className='default-primary-color text-primary-color'>
                <div id='header-container' className='page-container'>
                    <Img src={logo} style={{ height: '30px', width: '140px', flex: 'none' }} />
                    <div style={{flex: '1 auto'}}>
                        
                    </div>
                    <div style={{ flex: 'none' }}>
                        <Dropdown icon='user' className='icon' pointing text={name} fluid>
                            <Dropdown.Menu>
                                <Dropdown.Item text={t("Home")} as={Link} to='/' />
                                <Dropdown.Item text={t("Profile")} as={Link} to='/profile' />
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logout} text={t("Sign out")} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div id='page-content'>
                <div id='content-container' className='page-container'>
                    <Switch>
                        <Route path="/calendar-event/:id" component={CalendarEvent} />
                        <Route path="/calendar-event/add" component={CalendarEvent} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </div>
            <div id='page-footer'>
                <div id='footer-container' className='page-container'>

                </div>
            </div>
        </div>
    )
};
