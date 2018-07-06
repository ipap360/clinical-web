import { StepLabel } from "@material-ui/core";
import { Trans } from "react-i18next";

export default ({ children, ...props }) => (
    <StepLabel {...props}>
        <Trans>
            {children}
        </Trans>
    </StepLabel>
);