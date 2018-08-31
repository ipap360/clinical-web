import React from 'react'
import { withStyles } from "@material-ui/core";
// import { Typography } from '../../../components';

const styles = theme => ({
    root: {
        position: 'relative',
        // flex: '1 0 76px',
        // height: '
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // background: `linear-gradient(${partA}, ${partA} 50%, ${partB} 50%)`,
        // color: theme.palette.getContrastText(partB),
        "&:not(:last-child)": {
            // marginRight: "2px"
        },
        "& > div": {
            // position: 'absolute',
            // color: theme.palette.getContrastText(partA),
            // padding: '16px',
            // top: 0,
            // left: 0,
            // fontSize: '.8em'
        }
    }
});

export default withStyles(styles)(({ classes, t, data }) => {
    return (
        <div className={classes.root}>
            <div></div>
        </div>
    );
});