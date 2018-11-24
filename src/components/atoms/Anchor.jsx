import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        color: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        textDecoration: "none",
        borderBottomStyle: "dotted",
        borderBottomWidth: 1,
        "&:hover": {
            borderBottomStyle: "solid"
        }
    }
});

const Anchor = ({ classes, className, ...props }) => (
    <Link className={classNames(classes.root, className)} {...props} />
);

export default withStyles(styles)(Anchor);
