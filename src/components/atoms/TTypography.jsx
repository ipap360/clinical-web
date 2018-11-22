import React from "react";
import { Typography } from "@material-ui/core";
import { Trans } from "react-i18next";
// import LinesEllipsis from 'react-lines-ellipsis';

export default ({ children, maxLine, ellipsis = {}, trans = {}, ...props }) => (
    <Typography {...props}>
        <Trans {...trans}>
            {children}
            {/* {maxLine ? <LinesEllipsis component='span' maxLine={maxLine} text={children} {...ellipsis} /> : children} */}
        </Trans>
    </Typography>
);
