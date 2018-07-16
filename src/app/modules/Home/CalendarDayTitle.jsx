import React from 'react'
import { withStyles } from "@material-ui/core";
import { Typography } from '../../../components';

const partA = '#eaeaea';
const partB = '#ffffff';

const styles = theme => ({
    root: {
        position: 'relative',
        flex: '1 0 76px',
        height: '128px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(${partA}, ${partA} 50%, ${partB} 50%)`,
        color: theme.palette.getContrastText(partB),
        "&:not(:last-child)": {
            marginRight: "2px"
        },
        "& > div": {
            position: 'absolute',
            color: theme.palette.getContrastText(partA),
            padding: '16px',
            top: 0,
            left: 0,
            // fontSize: '.8em'
        }
    }
});

// .Component-root-3146:after {
//     position: absolute;
//     content: " ";
//     width: 2px;
//     right: -2px;
//     height: 50%;
//     top: 50%;
//     background: #eaeaea;
// }

export default withStyles(styles)(({ classes, text, number, availability }) => {
    return (
        <div className={classes.root}>
            <div>
                <Typography variant='subheading'>{{ text }}</Typography>
            </div>
            <Typography variant='display3'>{{ number }}</Typography>
        </div>
    );
});