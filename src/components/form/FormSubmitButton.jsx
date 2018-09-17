import React from 'react';
import { AsyncButton } from '../atoms';
import connect from './connect';

export default connect(({ submit, form, submitting, reset, error, ...props }) => {

    return (
        <AsyncButton
            onClick={submit(form)}
            loading={submitting}
            disabled={submitting}
            variant="contained"
            color="primary"
            type="submit"
            {...props} 
        />
    )    
});