import React from "react";
import { CircularProgress, Typography, withStyles } from "@material-ui/core";

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

export default withStyles(styles)(({ classes, size, color, ...props }) => (
    <div className={classes.root}>
        <CircularProgress color={color} size={size} />
        <br />
        <Typography className={classes.text} variant='h6' color={color} {...props} />
    </div>
));
