import React from "react";
import { Button, withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        "&.fullWidth": {
            // justifyContent: "space-between",
            "& > i": {
                flex: "none"
            },
            "& > span.label-text": {
                flex: "1 auto"
            }
        }
    },
    icon: {
        flex: "none"
    },
    innerLabel: {
        flex: "1 auto",
        textAlign: "center"
    },
    iconL: {
        marginRight: theme.spacing.unit
    },
    iconR: {
        marginLeft: theme.spacing.unit
    }
});

const RichButton = ({
    classes,
    className,
    children,
    icon,
    iconPosition = "left",
    iconProps = {},
    ...other
}) => {
    return (
        <Button className={classNames(className, classes.root)} {...other}>
            {icon && iconPosition === "left" && (
                <i
                    className={classNames(icon, classes.icon, classes.iconL)}
                    {...iconProps}
                />
            )}
            <span className={classes.innerLabel}>{children}</span>
            {icon && iconPosition === "right" && (
                <i
                    className={classNames(icon, classes.icon, classes.iconR)}
                    {...iconProps}
                />
            )}
        </Button>
    );
};

export default withStyles(styles)(RichButton);
