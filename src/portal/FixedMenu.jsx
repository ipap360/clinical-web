import React from 'react';
import PortalMenu from './PortalMenu';
import SessionMenu from './SessionMenu';
import { Responsive, Menu, Container } from 'semantic-ui-react';

const FixedMenu = ({ isVisible }) => (
    <Responsive minWidth='768'>
        <Menu size='large' fixed='top' className={(isVisible) ? '' : 'hidden'}>
            <Container>
                <PortalMenu />
                <Menu.Menu position='right'>
                    <SessionMenu namespace='fixed'/>
                </Menu.Menu>
            </Container>
        </Menu>
    </Responsive>
);

export default FixedMenu;