import React from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

export default withStyles(theme => ({
    root: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
}))(({ src, classes, className, style, size = "cover", children, props }) => (
    <div
        style={{
            ...style,
            backgroundImage: `url(${src})`,
            backgroundSize: size,
        }}
        className={classNames(classes.root, className)}
        {...props}
    >
        {children}
    </div>
));
