import React from "react";
import styled, { css } from "styled-components";
import BackgroundImage from "../atoms/BackgroundImage";

const wrapper = css`
    min-height: calc(100vh);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
`

export const PageWrapper = styled.div`
    ${wrapper}
`;

export const PageImgWrapper = styled(BackgroundImage)`
    ${wrapper}
`;
