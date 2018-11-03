import React from "react";
import { AppBar, Toolbar, IconButton, withStyles } from "@material-ui/core";
import { AccountCircle, Home as HomeIcon } from "@material-ui/icons";
import { PROFILE, ROOT } from "../routes";
import { TTypography, SimpleMenu, Link } from "../../components";
import { withI18n, withRouter } from "../../context";

import styles from "./styles";

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        const { t, logout } = props;
        const items = [
            {
                children: t("Profile"),
                component: Link,
                to: PROFILE,
                divider: true
            },
            {
                children: t("Logout"),
                onClick: logout
            }
        ];

        this.state = { items };
    }

    render() {
        const { classes, history, children } = this.props;
        const { root, homeTrigger, menuTrigger, titleCss, menuCss } = classes;
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
                        {children}
                    </Toolbar>
                    <SimpleMenu
                        label={<AccountCircle className={menuTrigger} />}
                        className={menuCss}
                        items={items}
                        Component={IconButton}
                        style={{ minWidth: 180 }}
                    />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withI18n()(withStyles(styles)(withRouter(TopBar)));

{
    /* <Toolbar disableGutters className={toolbar2}>
{content}
</Toolbar> */
}
