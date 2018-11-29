import React, { Component } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AccountCircle, Apps as AppsIcon } from "@material-ui/icons";
import classNames from "classnames";
import { ROOT } from "../routes";
import { SimpleMenu, NavButton, TTypography } from "../../components";
import { consume } from "../../context";
import styles from "./styles";
import appMenu from "./appMenu";
import userMenu from "./userMenu";

class TopBar extends Component {
    constructor(props) {
        super(props);
        const { t } = props;
        // this.bodyRef = React.createRef();
    }

    render() {
        const { t, classes, title, nav, body, sidebar } = this.props;
        const {
            topbarCss,
            homeTrigger,
            menuTrigger,
            menuCss,
            titleCss,
            topbarNav,
            topbar2Css,
            withSidebar
        } = classes;

        return (
            <AppBar className={topbarCss} position="fixed">
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
                    <Toolbar className={topbarNav} disableGutters>
                        {nav}
                    </Toolbar>
                    <SimpleMenu
                        label={<AppsIcon className={menuTrigger} />}
                        className={menuCss}
                        items={appMenu({ t })}
                        Component={IconButton}
                        style={{ minWidth: 180 }}
                    />
                    <SimpleMenu
                        label={<AccountCircle className={menuTrigger} />}
                        className={menuCss}
                        items={userMenu({ t })}
                        Component={IconButton}
                        style={{ minWidth: 180 }}
                    />
                </Toolbar>
                {body && (
                    <Toolbar
                        disableGutters
                        className={classNames(topbar2Css, {
                            [withSidebar]: !!sidebar
                        })}
                        // ref={this.bodyRef}
                    >
                        {body}
                    </Toolbar>
                )}
            </AppBar>
        );
    }
}

export default consume({ ref: true, router: true, styles })(TopBar);
