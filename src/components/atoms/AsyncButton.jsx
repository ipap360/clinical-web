import React from "react";
import { Button, CircularProgress } from "@material-ui/core";

const sizeMap = {
    small: 10,
    medium: 14,
    large: 18
};

export default ({ loading, children, size = "medium", ...props }) => {
    return (
        <Button size={size} {...props}>
            {loading ? (
                <CircularProgress size={sizeMap[size]} color="primary" />
            ) : (
                children
            )}
        </Button>
    );
};
