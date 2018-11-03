import React from "react";

import styles from "./styles";
import { withStyles } from "@material-ui/core";

import classNames from "classnames";

class Main extends React.Component {
    render() {
        const { classes, children, sidebar, topbar } = this.props;
        return (
            <div
                className={classNames(classes.root, {
                    [classes.withSidebar]: !!sidebar,
                    [classes.withTopbar]: !!topbar
                })}
            >
                {children}
            </div>
        );
    }
}

export default withStyles(styles)(Main);
