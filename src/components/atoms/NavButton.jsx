import React from "react";
import { Link } from "react-router-dom";
import RichButton from "./RichButton";

const BLink = ({ to, replace = false, ...props }) => {
    return <Link to={to} replace={replace} {...props} />;
};
export default ({ to, ...props }) => (
    <RichButton component={BLink} to={to} {...props} />
);
