import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import {
    AccountCircle,
    // Home as HomeIcon,
    Apps as AppsIcon
} from "@material-ui/icons";
import classNames from "classnames";
import { PROFILE, PATIENTS_LIST, SETTINGS, ROOT } from "../routes";
import { SimpleMenu, NavButton, Link, TTypography } from "../../components";
import { consume } from "../../context";
import { sessions } from "../../api";

import styles from "./styles";

class TopBar extends Component {
    constructor(props) {
        super(props);
        const { t } = props;

        this.appMenu = [
            {
                children: t("Home"),
                component: Link,
                to: ROOT,
                divider: true
            },
            {
                children: t("Patients"),
                component: Link,
                to: PATIENTS_LIST
            },
            {
                children: t("Settings"),
                component: Link,
                to: SETTINGS
            }
        ];

        this.personalMenu = [
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

        this.bodyRef = React.createRef();
    }

    render() {
        const {
            classes,
            history,
            location,
            title,
            nav,
            body,
            sidebar
        } = this.props;
        const {
            root,
            homeTrigger,
            menuTrigger,
            menuCss,
            titleCss,
            toolbar2,
            withSidebar
        } = classes;

        return (
            <AppBar className={root} position="fixed">
                <Toolbar disableGutters>
                    <NavButton
                        className={homeTrigger}
                        icon="fas fa-home"
                        to={ROOT}
                        color="inherit"
                    />
                    <TTypography
                        className={titleCss}
                        variant="title"
                        color="inherit"
                    >
                        {title}
                    </TTypography>
                    <Toolbar style={{ flex: "1 auto" }} disableGutters>
                        {nav}
                    </Toolbar>
                    <SimpleMenu
                        label={<AppsIcon className={menuTrigger} />}
                        className={menuCss}
                        items={this.appMenu}
                        Component={IconButton}
                        style={{ minWidth: 180 }}
                    />
                    <SimpleMenu
                        label={<AccountCircle className={menuTrigger} />}
                        className={menuCss}
                        items={this.personalMenu}
                        Component={IconButton}
                        style={{ minWidth: 180 }}
                    />
                </Toolbar>
                <Toolbar
                    disableGutters
                    className={classNames(toolbar2, {
                        [withSidebar]: !!sidebar
                    })}
                    ref={this.bodyRef}
                >
                    {body}
                </Toolbar>
            </AppBar>
        );
    }
}

export default consume({ ref: true, router: true, styles })(TopBar);
