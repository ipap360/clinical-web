import React from "react";
import loginPhoto from "../../assets/images/login.jpg";
import LoginForm from "./LoginForm";
import styles from "./styles";
// import { SIGNUP } from '../paths';

import { TTypography, PageWrapper } from "../../components";
import { Paper, AppBar, withStyles } from "@material-ui/core";

class Login extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <PageWrapper className={classes.wrapper}>
                <Paper square={true} className={classes.container}>
                    <AppBar position="static" elevation={0}>
                        <TTypography
                            color="inherit"
                            align="center"
                            variant="title"
                            className={classes.pad}
                        >
                            Log In
                        </TTypography>
                    </AppBar>
                    <LoginForm className={classes.loginForm} />
                    {/* <Divider />
                        <Pad>
                            <Typography align="left">
                                No account? <strong><Link to={SIGNUP}>Sign Up</Link></strong>
                            </Typography>
                        </Pad>                     */}
                </Paper>
            </PageWrapper>
        );
    }
}

export default withStyles(styles)(Login);
