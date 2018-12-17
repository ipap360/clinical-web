import React from "react";
import {
    Form,
    FormSelect,
    FormSubmitButton,
    FormResetButton,
    FormRow,
    FormError,
    FormButtonsContainer
} from "../../components";
import { profile } from "../../api";
import { consume } from "../../context";
import classNames from "classnames";
import { formStyles as styles } from "../../components";
import { setLocale } from "../store";
// import moment from "moment";

// const timezones = moment.tz.names().map(tz => ({
//     value: tz,
//     label: tz
// }));

const ProfileForm = ({ t, classes, className, setLocale }) => (
    <Form
        id={1}
        save={(id, values) => profile.save(values)}
        load={profile.view}
        className={classNames(classes.form, className)}
        formProps={{ noValidate: "novalidate" }}
        onSaveSuccess={(form, response) => {
            setLocale(response.locale);
        }}
    >
        <FormRow>
            <FormSelect name="locale" label={t("Locale")} fullWidth required>
                <FormSelect.Option value="en-US">
                    United States
                </FormSelect.Option>
                <FormSelect.Option value="en-GB">
                    United Kingdom
                </FormSelect.Option>
                <FormSelect.Option value="el-GR">Ελλάδα</FormSelect.Option>
            </FormSelect>
        </FormRow>
        {/* <FormRow>
            <FormSelect
                name="timezone"
                options={timezones}
                label={t("Timezone")}
                fullWidth
                required
            />
        </FormRow> */}
        <FormButtonsContainer>
            <FormSubmitButton>{t("Save")}</FormSubmitButton>
            <FormResetButton>{t("Undo")}</FormResetButton>
        </FormButtonsContainer>
        <FormError />
    </Form>
);

const d2p = { setLocale };
const store = { d2p };
export default consume({ styles, store })(ProfileForm);
