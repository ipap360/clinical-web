import React, { Component } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import loginPhoto from "../../assets/images/login.jpg";
import { PageImgWrapper, TTypography, Snackbar } from "../../components";
import { consume } from "../../context";
import { Paper, AppBar } from "@material-ui/core";
import { notify } from "../store";
import { ROOT } from "../routes";

const styles = theme => {
    return {
        container: {
            margin: "0 auto"
        },
        pad: {
            padding: theme.spacing.unit * 1
        },
        form: {
            width: 350
        }
    };
};

class ResetPassword extends Component {
    constructor(props) {
        super(props);
    }

    onSaveSuccess = (form, response) => {
        const { notify, history } = this.props;
        notify({
            message: response.message,
            variant: "success"
        });
        history.push(ROOT, {
            prev: window.location.pathname
        });
    };

    render() {
        const { classes, match } = this.props;
        const {
            params: { token }
        } = match;

        return (
            <PageImgWrapper src={loginPhoto}>
                <Paper square={true} className={classes.container}>
                    <AppBar position="static" elevation={0}>
                        <TTypography
                            color="inherit"
                            align="center"
                            variant="title"
                            className={classes.pad}
                        >
                            Reset Password
                        </TTypography>
                    </AppBar>
                    <ResetPasswordForm
                        onSaveSuccess={this.onSaveSuccess}
                        className={classes.form}
                        token={token}
                    />
                </Paper>
            </PageImgWrapper>
        );
    }
}

const d2p = { notify };
const store = { d2p };

export default consume({ store, styles, router: true })(ResetPassword);
