import React from 'react';
import { fromQueryParams } from '../../utils';
import { PageWrapper, Loader, Typography, NavButton } from '../../../components';
import { ErrorOutline, Done } from '@material-ui/icons';
import { CONFIRM_QUERY_PARAM } from '../Signup';

export default class SignupConfirm extends React.Component {

    constructor(props) {
        super(props);
        const { confirmSignup } = props;

        console.log(window.location);
        const q = fromQueryParams(window.location.search);
        console.log(q);
        if (q[CONFIRM_QUERY_PARAM]) {
            confirmSignup(q[CONFIRM_QUERY_PARAM]);
        }
    }

    render() {
        const { loading, isError, isDone, message, t } = this.props;
        return (
            <PageWrapper>
                {loading && <Loader />}
                {(isError && !loading) && <ErrorOutline />}
                {(isDone && !loading) && <Done />}
                <Typography>
                    {message}
                </Typography>
                {(isDone && !loading) && <NavButton>{t("Get Started")}</NavButton>}
            </PageWrapper>
        );
    }
}