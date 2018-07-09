import React from 'react';

import { Form, FormTextField, FormSubmitButton, FormResetButton } from '../../components';

export default ({ t, handleSubmit, ...props }) => (
    <Form onSubmit={handleSubmit}>
        <FormTextField name='name' label={t("Name")} />
        <FormSubmitButton />
        <FormResetButton />
    </Form>
);