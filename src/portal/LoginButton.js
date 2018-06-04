import React from 'react';
import { connect } from 'react-redux';

import t from 'i18n';
import { Button } from 'semantic-ui-react';

const LoginButton = ({ onClick }) => (
    <Button onClick={onClick} content={t("Login")} />
);

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {

            // TODO
            console.log(this);

            dispatch({
                type: 'OPEN_LOGIN'
            });
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginButton);

