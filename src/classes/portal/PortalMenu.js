import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import MenuItem from './MenuItem';
import t from '../../i18n/i18n';

class PortalMenu extends Component {
    constructor(props) {
        super(props);
        const { pathname } = this.props.location;
        this.state = {
            items: [
                {
                    name: 'home',
                    path: '/',
                    label: t('Home')
                },
                {
                    name: 'services',
                    path: '/services',
                    label: t('Services')
                },
                {
                    name: 'contact',
                    path: '/contact',
                    label: t('Contact')
                }
            ]
        }
    }

    render() {
        const { pathname } = this.props.location;
        const { items } = this.state;
        return (
            <Fragment>
                {items.map(v => <MenuItem key={v.name} {...v} current={pathname} /> )}
            </Fragment>
        );
    }
}

export default withRouter(PortalMenu);