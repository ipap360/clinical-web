import React from 'react'
import { withStyles } from "@material-ui/core";
import { Typography } from '../../../components';
import classNames from 'classnames';

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
            marginRight: theme.spacing.unit / 2
        },
    },
    dayname: {
        position: 'absolute',
        color: theme.palette.getContrastText(partA),
        padding: '16px',
        top: 0,
        left: 0,
    },
    availability: {
        'position': 'absolute',
        'bottom': 0,
        'left': 0,
        'width': '100%',
        'display': 'flex',
        'justify-content': 'space-between',
        'padding': '4px 8px',
        "& > div": {
            display: 'flex',
            alignItems: 'center'
        },
        "& i": {
            padding: theme.spacing.unit / 2,
            fontSize: 18
        },
        "& .fa-male": {
            color: "#2196f3"
        },
        "& .fa-female": {
            color: "#e91e63"
        }
    },
    indicator: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        backgroundColor: "#4caf50",
        // fontFamily: theme.typography.fontFamily,
        "&.limited": {
            backgroundColor: "#ffc107"
        },
        "&.restricted": {
            backgroundColor: "#ff5722"
        },
        "&.full": {
            backgroundColor: "#f44336"
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
    const { m = "", f = "", male, female } = availability;
    return (
        <div className={classes.root}>
            <div className={classes.dayname}>
                <Typography variant='subheading'>{{ text }}</Typography>
            </div>
            <Typography variant='display3'>{{ number }}</Typography>
            <div className={classes.availability}>
                <div>
                    <Typography>{male+" x"}</Typography>
                    <i class="fas fa-male"></i>
                    <span class={classNames(classes.indicator, m.toLowerCase())}>
                    </span>
                </div>
                <div>
                    <Typography>{female+" x"}</Typography>
                    <i class="fas fa-female"></i>
                    <span class={classNames(classes.indicator, f.toLowerCase())}>
                    </span>
                </div>
                {/* {gender === 'MALE' && } */}
                {/* {gender === 'FEMALE' && <i class="fas fa-female"></i>} */}
            </div>
        </div>
    );
});