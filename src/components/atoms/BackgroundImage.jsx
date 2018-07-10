import styled from "styled-components";
// ${props => (props.width) ? 'width: ' + props.width : ''}
// ${props => (props.height) ? 'height: ' + props.height : ''}
// ${props => (props.hasOwnProperty('fluid')) ? 'width: 100%' : ''}
export default styled.div`
    background-image: url(${props => props.src});
    background-position: center;
    background-size: ${props => props.size || 'cover'};
    background-repeat: no-repeat;
`;