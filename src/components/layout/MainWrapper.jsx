import React from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        position: "relative",
        paddingTop: "128px",
        flex: "1 auto",
        width: "100%",
    },
});

const MainWrapper = ({ classes, className, ...props }) => (
    <div className={classNames(classes.root, className)} {...props} />
);

export default withStyles(styles)(MainWrapper);
