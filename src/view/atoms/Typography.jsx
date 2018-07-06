import { Typography } from "@material-ui/core";
import { Trans } from "react-i18next";

export default ({ children, ...props }) => (
    <Typography {...props}>
        <Trans>
            {children}
        </Trans>
    </Typography>
);