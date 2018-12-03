import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { consume } from "../../context";

const PatientsNavBar = ({ t, classes, history, location }) => {
    const search = history.location.search;
    const value = search ? new URLSearchParams(search).get("q") : "";
    return (
        <div className={classes.root}>
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <SearchIcon />
                </Grid>
                <Grid item>
                    <input
                        type="search"
                        placeholder={t("Search")}
                        className={classes.input}
                        value={value}
                        onChange={evt => {
                            const q = evt && evt.currentTarget.value;
                            history.push({
                                pathname: location.pathname,
                                search: q ? "?q=" + q : ""
                            });
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

const styles = theme => ({
    root: {
        background: "rgba(255,255,255,.5)",
        padding: `0 ${theme.spacing.unit / 2}px`,
        borderRadius: 2
    },
    input: {
        background: "transparent",
        margin: "4px 4px 4px 0",
        padding: 4,
        color: "inherit",
        outline: "none",
        border: "none",
        "&::placeholder": {
            color: "white"
        }
    }
});

export default consume({ styles, router: true })(PatientsNavBar);
