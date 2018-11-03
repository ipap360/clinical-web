import React from "react";
import { Drawer, Toolbar, withStyles } from "@material-ui/core";
import classNames from "classnames";
import styles from "./styles";

const SideBar = ({ classes, children, className, ...props }) => (
    <Drawer
        className={classNames(classes.root, className)}
        variant="persistent"
        open={true}
        {...props}
    >
        <Toolbar />
        <Toolbar />
        <div className={classes.main}>{children}</div>
    </Drawer>
);

export default withStyles(styles)(SideBar);
