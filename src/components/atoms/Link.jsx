import React from "react";
import { Link } from "react-router-dom";

const IdempotentLink = ({ to, ...props }) => {
    const current = window.location.pathname;
    const { pathname, state = {}, ...other } =
        typeof to === "string" ? { pathname: to } : to;
    return (
        <Link
            to={{ pathname, state: { prev: current, ...state }, ...other }}
            replace={current === to}
            {...props}
        />
    );
};

export default IdempotentLink;
