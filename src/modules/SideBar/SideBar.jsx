import React from "react";
import { Drawer, Toolbar } from "../../../components";

export default ({ className, children, variant, open }) => {
    return (
        <Drawer className={className} variant="persistent" open={open}>
            <Toolbar />
            <Toolbar />
            {children}
        </Drawer>
    );
};
