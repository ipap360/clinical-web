import React from "react";
import { Link } from "react-router-dom";
import RichButton from "./RichButton";

const BLink = ({ to, replace = false, ...props }) => {
    return (
        <Link to={to} replace={window.location.pathname === to} {...props} />
    );
};
export default ({ to, Component = RichButton, ...props }) => (
    <Component component={BLink} to={to} {...props} />
);
