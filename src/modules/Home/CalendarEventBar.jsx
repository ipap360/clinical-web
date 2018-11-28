import React from "react";
import { withStyles, Paper, Typography } from "@material-ui/core";
import classNames from "classnames";
import { CALENDAR_EVENT } from "../routes";

const styles = theme => ({
    root: {
        position: "relative",
        cursor: "pointer",
        padding: "3px 6px",
        backgroundColor: theme.palette.primary.main,
        alignSelf: "flex-start",
        minHeight: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        "&:hover": {
            opacity: 0.75
        },
        "&:not(:last-child)": {
            // marginRight: "2px"
        },
        "&.is-carryover": {
            "padding-left": "12px"
        },
        "&.is-carryover:before": {
            content: '" "',
            position: "absolute",
            "border-bottom": "10px solid transparent",
            "border-top": "10px solid transparent",
            "border-left": "10px solid",
            left: "0px",
            top: "50%",
            "margin-top": "-10px"
        },
        "&.is-continued:after": {
            content: '" "',
            position: "absolute",
            "border-bottom": "11px solid rgba(255, 255, 255, 1);",
            "border-top": "11px solid rgba(255, 255, 255, 1);",
            "border-left": "11px solid transparent",
            right: "0px",
            top: "0",
            bottom: "0"
            // 'margin-top': '-15px'
        },
        "&.is-daily": {
            "background-color": theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.light)
        },
        "&.is-completed": {
            "background-color": "transparent",
            color: "#777"
        },
        "& > i": {
            marginRight: 3,
            fontSize: 20,
            "&.fa-female": {
                color: "#f8bbd0"
            },
            "&.fa-male": {
                color: "#81d4fa"
            }
        },
        "&.is-completed > .fa-check": {
            color: theme.palette.primary.main
        },
        "&.is-completed > p": {
            color: "inherit"
        },
        "& > p": {
            maxHeight: 58,
            // lineHeight: 1
            // display: '-webkit-box',
            // '-webkit-line-clamp': 3,
            // '-webkit-box-orient': 'vertical',
            overflow: "hidden",
            textOverflow: "ellipsis"
            // position: 'absolute',
            // color: theme.palette.getContrastText(partA),
            // padding: '16px',
            // top: 0,
            // left: 0,
            // fontSize: '.8em'
        }
    }
});

export default withStyles(styles)(({ classes, data, history }) => {
    const {
        id,
        start,
        end,
        isDaily,
        isCarryOver,
        isContinued,
        patientNotes,
        name,
        code,
        eventNotes,
        isCompleted,
        isPostponed
    } = data;

    if (isPostponed) return null;

    const patient = [name, code, patientNotes].join(" ");
    const text = eventNotes ? [patient, eventNotes].join(", ") : patient;

    const span2 = start === end && text.length > 30;

    return (
        <Paper
            onClick={() => {
                history.push(CALENDAR_EVENT.replace(":id", id), {
                    prev: window.location.pathname
                });
            }}
            className={classNames(classes.root, {
                "is-continued": isContinued,
                "is-carryover": isCarryOver,
                "is-daily": isDaily,
                "is-completed": isCompleted
            })}
            style={{
                gridColumn: `${start} / ${end + 1}`,
                gridRowEnd: span2 ? "span 2" : null
            }}
        >
            <Typography
                color="inherit"
                variant="caption"
                style={{ whiteSpace: !span2 ? "nowrap" : null }}
                title={text}
            >
                {text}
            </Typography>
            {isCompleted && <span className="fas fa-check" />}
        </Paper>
    );
});
