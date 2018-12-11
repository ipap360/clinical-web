import React, { Component } from "react";
import { RichButton } from "../atoms";
import AlertDialog from "./AlertDialog";

class ButtonWithAlert extends Component {
    constructor(props) {
        super(props);
        this.state = { dialog: false };
    }

    ask = () => {
        this.setState({
            dialog: true
        });
    };

    close = () => {
        this.setState({
            dialog: false
        });
    };

    onOK = () => {
        const { onClick } = this.props;
        onClick.apply();
        this.close();
    };

    render() {
        const {
            alertTitle,
            alertBody,
            alertBodyProps,
            alertProps = {},
            onClick,
            ...other
        } = this.props;
        return (
            <React.Fragment>
                <RichButton {...other} onClick={this.ask} />
                <AlertDialog
                    title={alertTitle}
                    contentProps={alertBodyProps}
                    isOpen={this.state.dialog}
                    onCancel={this.close}
                    onOK={this.onOK}
                    {...alertProps}
                >
                    {alertBody}
                </AlertDialog>
            </React.Fragment>
        );
    }
}

export default ButtonWithAlert;
