import React from "react";
import classNames from "classnames";
import { Toolbar, withStyles } from "@material-ui/core";

import TopBar from "./TopBar";
import styles from "./styles";

class Main extends React.Component {
    render() {
        const {
            classes,
            children,
            sidebar,
            topbar = true,
            title,
            search,
            nav,
            head
        } = this.props;
        return (
            <React.Fragment>
                <TopBar
                    title={title}
                    nav={nav}
                    body={head}
                    search={search}
                    sidebar={!!sidebar}
                />
                <div
                    className={classNames(classes.main, {
                        [classes.withSidebar]: !!sidebar
                    })}
                >
                    {topbar && <Toolbar disableGutters />}
                    {topbar && head && <Toolbar disableGutters />}
                    {children}
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Main);
