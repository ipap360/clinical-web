import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const ActionButton = ({onClick, action, payload, ...custom}) => (
    <Button onClick={onClick.bind(this, action, payload)} {...custom} />
);

const mapS2P = (state, ...args) => {
    console.log(state, args)
    return {
        
    }
};

const mapD2P = (dispatch) => {
    return {
        onClick: (action, payload) => {
            dispatch({
                type: action,
                payload
            });
        }
    }
}

export default connect(mapS2P, mapD2P)(ActionButton);