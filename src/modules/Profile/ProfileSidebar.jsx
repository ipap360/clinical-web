import React from "react";
// import classNames from "classnames";
import { consume } from "../../context";
import {
    ModalFormContainer,
    RichButton,
    layoutStyles as styles
} from "../../components";

import { Divider, Typography } from "@material-ui/core";
import SideBar from "../SideBar";
import ChangePasswordForm from "./ChangePasswordForm";

class ProfileSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pwd: false
        };
    }

    open = () => {
        this.setState({
            pwd: true
        });
    };

    close = () => {
        this.setState({
            pwd: false
        });
    };

    onChangePwd = () => {
        this.close();
    };

    render() {
        const { t, classes, history } = this.props;

        return (
            <SideBar>
                <div className={classes.sidebar}>
                    <div>
                        <RichButton
                            icon="fas fa-arrow-left"
                            fullWidth
                            onClick={() => history.go(-1)}
                            variant="outlined"
                        >
                            {t("Back")}
                        </RichButton>
                    </div>
                    <Divider />
                    <div>
                        <RichButton
                            onClick={() => this.open()}
                            variant="contained"
                            fullWidth
                            iconPosition="right"
                        >
                            {t("Change Password")}
                        </RichButton>
                        <ModalFormContainer
                            open={this.state.pwd}
                            onClose={this.close}
                            title={t("Change Password")}
                        >
                            <ChangePasswordForm
                                className={classes.modalform}
                                onSaveSuccess={() => {
                                    this.onChangePwd();
                                }}
                            />
                        </ModalFormContainer>
                    </div>
                </div>
            </SideBar>
        );
    }
}

export default consume({ router: true, styles })(ProfileSidebar);
