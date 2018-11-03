import React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
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

    render() {
        const { anchorEl, id } = this.state;
        const { className, label, items = [], Component = Button } = this.props;
        return (
            <div className={className}>
                <Component
                    aria-owns={anchorEl ? id : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
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
                        return <MenuItem key={i} {...item} />;
                    })}
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;
