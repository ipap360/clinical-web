import React from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        height: 30,
        width: "100%",
    },
});

const Spacer = ({ classes, className, ...props }) => (
    <div className={classNames(classes.root, className)} {...props} />
);

export default withStyles(styles)(Spacer);
