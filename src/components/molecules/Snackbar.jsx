import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
    Error as ErrorIcon,
    Info as InfoIcon,
    Close as CloseIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon
} from "@material-ui/icons";
import {
    withStyles,
    Snackbar,
    SnackbarContent,
    IconButton,
    colors
} from "@material-ui/core";
import { Trans } from "react-i18next";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const { green, amber } = colors;
const styles1 = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon
                        className={classNames(
                            classes.icon,
                            classes.iconVariant
                        )}
                    />
                    <Trans>{message}</Trans>
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
});

class MySnackbar extends React.Component {
    render() {
        const {
            classes,
            message,
            variant = "info",
            contentProps,
            onClose,
            ...other
        } = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={!!message}
                autoHideDuration={6000}
                onClose={onClose}
                {...other}
            >
                <MySnackbarContentWrapper
                    onClose={onClose}
                    variant={variant}
                    message={message}
                    {...contentProps}
                />
            </Snackbar>
        );
    }
}

MySnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]),
    contentProps: PropTypes.object,
    onClose: PropTypes.func
};

export default withStyles(styles2)(MySnackbar);
