import React from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        minHeight: "calc(100vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
});

const PageWrapper = ({ classes, className, ...props }) => (
    <div className={classNames(classes.root, className)} {...props} />
);

export default withStyles(styles)(PageWrapper);
