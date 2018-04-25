import React from 'react';
import { Responsive, Menu, Container, Icon } from 'semantic-ui-react';
import PortalMenu from './PortalMenu';
import SessionMenu from './SessionMenu';

const TopMenu = ({ burgerHandler }) => (
    <Container>
        <Menu inverted pointing secondary size='large'>
            <Responsive as={Menu.Item} {...Responsive.onlyMobile} onClick={burgerHandler}>
                <Icon name='sidebar' />
            </Responsive>
            <Responsive as={PortalMenu} minWidth='768' />
            <Menu.Menu position='right' style={{alignItems: 'center'}}>
                <SessionMenu />
            </Menu.Menu>
        </Menu>
    </Container>
);

export default TopMenu;