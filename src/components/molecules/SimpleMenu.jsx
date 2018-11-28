import React from "react";
import { RichButton } from "../atoms";
import { Menu, MenuItem } from "@material-ui/core";
import { uuid } from "../../utils";

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
        id: uuid()
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = cb => {
        this.setState({ anchorEl: null });
    };

    componentWillUnmount() {
        // this.setState({ anchorEl: null });
    }

    render() {
        const { anchorEl, id } = this.state;
        const {
            className,
            label,
            labelProps,
            items = [],
            Component = RichButton
        } = this.props;
        return (
            <div className={className}>
                <Component
                    aria-owns={anchorEl ? id : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    {...labelProps}
                >
                    {label}
                </Component>
                <Menu
                    id={id}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {items.map((item, i) => {
                        return (
                            <MenuItem
                                key={i}
                                {...item}
                                onClick={this.handleClose}
                            />
                        );
                    })}
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;
