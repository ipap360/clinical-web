import React from "react";
import { AppBar, Toolbar, IconButton, withStyles } from "@material-ui/core";
import { AccountCircle, Home as HomeIcon } from "@material-ui/icons";
import classNames from "classnames";
import { PROFILE, ROOT } from "../routes";
import { TTypography, SimpleMenu, Link } from "../../components";
import { withI18n, withRouter, compose } from "../../context";
import { sessions } from "../../api";

import styles from "./styles";

// class Title extends React.Component {
//     render() {
//         return <div />;
//     }
// }
// class Body extends React.Component {
//     render() {
//         return <div />;
//     }
// }

// const getName = component => {
//     return component.displayName || component.name;
// };

// const getChildrenOfType = (children, component) => {
//     let result = [];
//     React.Children.forEach(children, child => {
//         const type = child && child.type && getName(child.type);
//         if (getName(component).includes(type)) {
//             if (Array.isArray(child.props.children)) {
//                 result.push(...child.props.children);
//             } else if (typeof child.props.children === "object") {
//                 result.push(child.props.children);
//             }
//         }
//     });
//     return result;
// };

class TopBar extends React.Component {
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
                        {/* {getChildrenOfType(children, Title)} */}
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
                    {/* {getChildrenOfType(children, Body)} */}
                </Toolbar>
            </AppBar>
        );
    }
}

// TopBar.Title = Title;
// TopBar.Body = Body;

export default compose(
    withStyles(styles),
    withRouter,
    withI18n()
)(TopBar);
