import React from 'react';
import styled from 'styled-components';

export const FlexColCenter = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;    
`;

// backgroundPosition: 'center',
// backgroundSize: 'cover',
// backgroundRepeat: 'no-repeat',
export const Img = styled.div`
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${props => props.src});
`;

// export const  = ({ src, ...props }) => (<DivImage style={{ backgroundImage: `url(${src})` }} {...props} />)