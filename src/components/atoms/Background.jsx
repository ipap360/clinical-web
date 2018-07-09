import styled from "styled-components";

export default styled.div`
    background-image: url(${props => props.src});
    background-position: 'center';
    background-size: 'cover';
    background-repeat: 'no-repeat';
`;