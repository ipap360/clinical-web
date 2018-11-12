import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AccountCircle, Home as HomeIcon } from "@material-ui/icons";
import classNames from "classnames";
import { PROFILE, ROOT } from "../routes";
import { TTypography, SimpleMenu, Link } from "../../components";
import { consume } from "../../context";
import { sessions } from "../../api";

import styles from "./styles";

class TopBar extends Component {
    constructor(props) {
        super(props);
        const { t } = props;
        const items = [
            {
                children: t("Profile"),
                component: Link,
                to: PROFILE,
                divider: true
            },
            {
                children: t("Logout"),
                onClick: () => {
                    sessions.expire();
                }
            }
        ];

        this.state = { items };
    }

    render() {
        const { classes, history, title, body, sidebar } = this.props;
        const {
            root,
            homeTrigger,
            menuTrigger,
            titleCss,
            menuCss,
            toolbar2,
            withSidebar
        } = classes;
        const { items } = this.state;

        return (
            <AppBar className={root} position="fixed">
                <Toolbar disableGutters>
                    <IconButton
                        className={homeTrigger}
                        color="inherit"
                        onClick={() => history.push(ROOT)}
                    >
                        <HomeIcon />
                    </IconButton>
                    <TTypography
                        className={titleCss}
                        variant="title"
                        color="inherit"
                    >
                        Clinic Bed Management
                    </TTypography>
                    <Toolbar style={{ flex: "1 auto" }} disableGutters>
                        {title}
                    </Toolbar>
                    <SimpleMenu
                        label={<AccountCircle className={menuTrigger} />}
                        className={menuCss}
                        items={items}
                        Component={IconButton}
                        style={{ minWidth: 180 }}
                    />
                </Toolbar>
                <Toolbar
                    disableGutters
                    className={classNames(toolbar2, {
                        [withSidebar]: !!sidebar
                    })}
                >
                    {body}
                </Toolbar>
            </AppBar>
        );
    }
}

export default consume({ router: true, styles })(TopBar);
