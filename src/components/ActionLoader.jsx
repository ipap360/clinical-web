import React from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { Message, Icon } from 'semantic-ui-react';
import t from 'i18n';

const ActionLoader = (props) => {

    const { type, message, loading, nav, ...custom } = props;

    const success = (type === "success");
    const error = (type === "error");

    return (
        <Message icon={!!loading} success={success} error={error} >
            {loading && <Icon name='circle notched' loading={!!loading} />}
            <Message.Content>
                {loading && <Message.Header>{t("Please wait...")}</Message.Header>}
                {message}
            </Message.Content>
            <Message.Content>
                {nav}
            </Message.Content>
        </Message>
    );
};

export default withRouter(connect()(ActionLoader));