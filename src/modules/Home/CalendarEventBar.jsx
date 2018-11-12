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
            "border-bottom": "15px solid rgba(255, 255, 255, 0.4);",
            "border-top": "15px solid rgba(255, 255, 255, 0.4);",
            "border-left": "20px solid transparent",
            right: "0px",
            top: "0",
            bottom: "0"
            // 'margin-top': '-15px'
        },
        "&.is-daily": {
            "background-color": theme.palette.primary.light,
            color: theme.palette.getContrastText(theme.palette.primary.light)
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
    const { id, start, end, patientNotes, name, code, eventNotes } = data;

    const patient = [name, code, patientNotes].join(" ");
    const text = eventNotes ? [patient, eventNotes].join(", ") : patient;

    const realstart = start === 0 ? 1 : start;
    const realend = end > 8 ? 8 : end;
    const span2 =
        (realstart === realend || realstart === realend - 1) &&
        text.length > 30;

    return (
        <Paper
            onClick={() => {
                history.push(CALENDAR_EVENT.replace(":id", id));
            }}
            className={classNames(classes.root, {
                "is-continued": end > 8,
                "is-carryover": start === 0,
                "is-daily": start === end
            })}
            style={{
                gridColumn: `${realstart} / ${realend}`,
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
        </Paper>
    );
});
