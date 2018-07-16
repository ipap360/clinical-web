// import React from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core";

 const W = styled.div`
    position: relative;
    padding-top: 128px;
    flex: 1 auto;
    width: 100%;
    ${props => {console.log(props); return "";}}
`;

export default withTheme()(W);

// min-height: calc(100vh);
// display: flex;
// justify-content: center;
// align-items: center;