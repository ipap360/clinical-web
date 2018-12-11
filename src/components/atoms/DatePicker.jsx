import React from "react";
import { DatePicker } from "material-ui-pickers";
import withUtils from "material-ui-pickers/_shared/WithUtils";
import {
    KeyboardArrowRight,
    KeyboardArrowLeft,
    Event as EventIcon
} from "@material-ui/icons";

export default withUtils()(({ value, utils, ...props }) => {
    return (
        <DatePicker
            keyboard
            clearable
            format={utils.moment.localeData().longDateFormat("L")}
            value={value || null}
            leftArrowIcon={<KeyboardArrowLeft />}
            rightArrowIcon={<KeyboardArrowRight />}
            keyboardIcon={<EventIcon />}
            {...props}
        />
    );
});
