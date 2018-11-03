import React from "react";
import { DatePicker } from "material-ui-pickers";
import withUtils from "material-ui-pickers/_shared/WithUtils";

export default withUtils()(({ value, utils, ...props }) => {
    return (
        <DatePicker
            keyboard
            clearable
            format={utils.moment.localeData().longDateFormat("L")}
            value={value || null}
            // mask={mask.split("")}
            {...props}
        />
    );
});