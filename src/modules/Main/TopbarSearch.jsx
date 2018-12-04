import React, { Component } from "react";
import { IconButton, Collapse, Paper } from "@material-ui/core";
import { Search as SearchIcon, Close as CloseIcon } from "@material-ui/icons";
import { consume } from "../../context";
import { getQueryParam } from "../../utils";

class TopbarSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleChange = evt => {
        const { history } = this.props;
        const value = evt.currentTarget.value;
        history.replace({
            pathname: history.location.pathname,
            search: value ? "?q=" + value : ""
        });
        if (!value) this.collapseSearch();
    };

    handleClose = () => {
        const { history } = this.props;
        history.replace({
            pathname: history.location.pathname,
            search: ""
        });
        this.collapseSearch();
    };

    expandSearch = () => {
        this.setState({ open: true });
    };

    collapseSearch = () => {
        this.setState({ open: false });
    };

    render() {
        const { t, classes, history } = this.props;
        const { open } = this.state;
        const value = getQueryParam(history, "q");

        const isOpen = open || value;
        return (
            <div className={classes.root}>
                <input
                    style={{
                        width: isOpen ? 150 : 0,
                        padding: isOpen ? "4px 16px" : 0
                    }}
                    placeholder={t("Search")}
                    className={classes.input}
                    value={value}
                    onChange={this.handleChange}
                />
                {isOpen ? (
                    <IconButton
                        onClick={this.handleClose}
                        className={classes.iconButton}
                        color="inherit"
                    >
                        <CloseIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={this.expandSearch}
                        className={classes.iconButton}
                        color="inherit"
                    >
                        <SearchIcon />
                    </IconButton>
                )}
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,.5)",
        padding: 0,
        borderRadius: 24
    },
    iconButton: {
        // padding: 4
    },
    input: {
        background: "transparent",
        margin: 0,
        color: "inherit",
        outline: "none",
        border: "none",
        width: "100%",
        transition: "all .5s",
        "&::placeholder": {
            color: "white"
        }
    }
});

export default consume({ styles, router: true })(TopbarSearch);
