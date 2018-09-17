import React from 'react';
import classNames from 'classnames';
import { PageWrapper, Loader, Typography, NavButton } from '../../../components';
import { withStyles, CircularProgress } from '@material-ui/core';
import { ROOT } from '../paths';


const styles = theme => ({
    okIcon: {
        color: theme.palette.primary.main,
        fontSize: 92
    },
    errorIcon: {
        color: theme.palette.error.main,
        fontSize: 92
    }
});

class SignupConfirm extends React.Component {

    componentWillMount() {

        const { confirmSignup, history, match, location } = this.props;

        const { params: { token } } = match;
        const { pathname } = location;

        if (token && token != "1") {
            confirmSignup({ token });
            history.replace(pathname.substring(0, pathname.lastIndexOf("/")) + "/1");
        }

    }

    render() {
        const { loading, isError, isDone, message, t, classes } = this.props;
        return (
            <PageWrapper>
                {loading && <CircularProgress size={75}/>}
                {(isError && !loading) && <i className={classNames("fas fa-exclamation-circle", classes.errorIcon)}></i>}
                {(isDone && !loading) && <i className={classNames("fas fa-check-circle", classes.okIcon)}></i>}
                <br/>
                <Typography variant='display2'>
                    {message}
                </Typography>
                {(isDone && !loading) && <NavButton to={ROOT}>{t("Get Started")}</NavButton>}
            </PageWrapper>
        );
    }
}

export default withStyles(styles)(SignupConfirm);