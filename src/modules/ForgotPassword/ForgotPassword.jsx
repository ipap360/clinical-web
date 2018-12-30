import React, { Component } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
// import loginPhoto from "../../assets/images/login.jpg";
import { PageWrapper, TTypography } from "../../components";
import { consume } from "../../context";
import EmailSent from "../EmailSent";
import { Paper, AppBar } from "@material-ui/core";

const styles = theme => {
    return {
        container: {
            margin: "0 auto",
        },
        pad: {
            padding: theme.spacing.unit * 1,
        },
        form: {
            width: 350,
        },
    };
};

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { msg: null };
    }

    onSaveSuccess = (form, response) => {
        this.setState({
            msg: response.message,
        });
    };

    render() {
        const { classes } = this.props;
        const { msg } = this.state;
        if (msg) {
            return <EmailSent>{msg}</EmailSent>;
        }

        return (
            <PageWrapper>
                <Paper square={true} className={classes.container}>
                    <AppBar position="static" elevation={0}>
                        <TTypography
                            color="inherit"
                            align="center"
                            variant="title"
                            className={classes.pad}
                        >
                            Reset Password Request
                        </TTypography>
                    </AppBar>
                    <ForgotPasswordForm
                        onSaveSuccess={this.onSaveSuccess}
                        className={classes.form}
                    />
                </Paper>
            </PageWrapper>
        );
    }
}

export default consume({ styles })(ForgotPassword);
