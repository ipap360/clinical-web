import React from 'react';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';
import { withRouter } from 'react-router';

const LoaderPage = (props) => {
    console.log(props);
    return (
        <Dimmer>
            <Loader />
        </Dimmer>
    );
};

export default withRouter(connect()(LoaderPage));