import React from "react";
import { Link } from "react-router-dom";

const IdempotentLink = ({ to, ...props }) => (
    <Link to={to} replace={window.location.pathname === to} {...props} />
);

export default IdempotentLink;
