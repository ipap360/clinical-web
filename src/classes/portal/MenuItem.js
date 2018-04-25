import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuItem = ({path, label, current, ...props}) => (
    <Menu.Item as={Link} active={current && path === current} to={path} {...props}>
        {label}
    </Menu.Item>
);

export default MenuItem;