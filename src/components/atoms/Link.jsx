// import React from 'react';
import { Link } from 'react-router-dom';
// import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

// color: ${props => props.theme ? props.theme.palette.primary.main : "inherit"}
const MyLink = styled(Link)`
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    text-decoration: none;
    border-bottom-style: dotted;
    border-bottom-width: 1px;
    &:hover {
        border-bottom-style: solid;
    }
`;

// export default withTheme()(({ theme, ...props }) => (<MyLink {...props} />));
export default MyLink;