import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const BLink = ({ to, replace = false, ...props }) => {
    return (<Link to={to} replace={replace} {...props} />);
}
export default ({ to, ...props }) => (<Button component={BLink} to={to} {...props} />)