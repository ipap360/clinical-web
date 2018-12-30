import React from "react";
import { withStyles } from "@material-ui/core";
import SketchPicker from "react-color/lib/components/sketch/Sketch";

const styles = theme => ({
    color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
    },
    swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
    },
    popover: {
        position: "fixed",
        zIndex: "2",
    },
    cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
    },
});

class ColorPickerAdapter extends React.Component {
    state = {
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false });
    };

    handleChange = color => {
        this.props.onChange(color.hex);
    };

    render() {
        const { classes, name, value, presetColors, disableAlpha } = this.props;
        const style = value ? { backgroundColor: value } : {};
        return (
            <div>
                <input type="hidden" value={value} name={name} />
                <div className={classes.swatch} onClick={this.handleClick}>
                    <div className={classes.color} style={{ ...style }} />
                </div>
                {this.state.displayColorPicker ? (
                    <div className={classes.popover}>
                        <div
                            className={classes.cover}
                            onClick={this.handleClose}
                        />
                        <SketchPicker
                            color={value}
                            onChange={this.handleChange}
                            disableAlpha={disableAlpha}
                            presetColors={presetColors}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerAdapter);
