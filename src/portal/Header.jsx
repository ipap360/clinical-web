import React from 'react';
import { Segment, Responsive, Menu, Container, Icon } from 'semantic-ui-react';
import PortalMenu from './PortalMenu';
import SessionMenu from './SessionMenu';

const Header = ({ burgerHandler }) => (
    <Segment inverted basic attached='top' className='borderless'>
        <Container>
            <Menu inverted pointing secondary size='large'>
                <Responsive as={Menu.Item} {...Responsive.onlyMobile} onClick={burgerHandler}>
                    <Icon name='sidebar' />
                </Responsive>
                <Responsive as={PortalMenu} minWidth='768' />
                <Menu.Menu position='right' style={{ alignItems: 'center' }}>
                    <SessionMenu />
                </Menu.Menu>
            </Menu>
        </Container>
    </Segment>
);

export default Header;