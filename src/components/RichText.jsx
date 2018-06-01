import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';

const RichText = (props) => {
    // console.log(props);
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export default RichText;