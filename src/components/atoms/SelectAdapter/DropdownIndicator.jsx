import React from "react";
import { components } from "react-select";
import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon
} from "@material-ui/icons";

export default (props) => {
    const { menuIsOpen } = props.selectProps;
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                {menuIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </components.DropdownIndicator>
        )
    );
};