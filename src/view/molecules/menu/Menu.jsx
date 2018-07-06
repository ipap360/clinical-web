import React from 'react';
import { Button, Menu, MenuItem } from '../../atoms';

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (cb) => {
        this.setState({ anchorEl: null });
        if (typeof cb === 'function') cb.apply();
    };

    render() {
        const { anchorEl } = this.state;
        const { label, items = [] } = this.props;
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {label}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {
                        items.map((item, i) => {
                            return <MenuItem key={i} onClick={this.handleClose.bind(item.click)}>{item.text}</MenuItem>
                        });
                    }
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;