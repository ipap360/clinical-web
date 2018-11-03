import React from "react";
import { Button, withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 auto",
        padding: theme.spacing.unit * 2
    },
    text: {
        padding: theme.spacing.unit
    }
});

export default withStyles(styles)(
    ({ children, classes, action, buttonProps, ...other }) => (
        <div className={classes.root} {...other}>
            <Typography className={classes.text} color="error" variant="h5">
                {children}
            </Typography>
            <Button
                variant="contained"
                size="small"
                onClick={action}
                {...buttonProps}
            >
                Retry
            </Button>
        </div>
    )
);
