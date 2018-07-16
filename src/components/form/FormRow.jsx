import React from 'react';
import { withStyles } from "@material-ui/core";

const style = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
        display: 'flex',
        alignItems: 'center',
        "& > label": {
            marginRight: theme.spacing.unit * 3
        }
    }
});

export default withStyles(style)(({ classes, ...props }) => (
    <div className={classes.root} {...props} />
));