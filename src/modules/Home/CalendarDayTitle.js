import React from "react";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import { CALENDAR_EVENT } from "../routes";
import { consume } from "../../context";

const partA = "#eaeaea";
const partB = "#ffffff";

const styles = theme => ({
    root: {
        cursor: "pointer",
        position: "relative",
        flex: "1 0 76px",
        height: "128px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(${partA}, ${partA} 50%, ${partB} 50%)`,
        color: theme.palette.getContrastText(partB),
        "&:not(:last-child)": {
            marginRight: theme.spacing.unit / 2
        },
        "&:hover": {
            opacity: 0.75
        }
    },
    dayname: {
        position: "absolute",
        color: theme.palette.getContrastText(partA),
        padding: "16px",
        top: 0,
        left: 0
    },
    availability: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        "justify-content": "space-between",
        padding: "4px 8px",
        "& > div": {
            display: "flex",
            alignItems: "center"
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
        borderRadius: "50%",
        width: 16,
        height: 16,
        backgroundColor: "#4caf50"
    }
});

const CalendarDayTitle = ({ classes, d, history }) => {
    const { m = "", f = "", male, female } = d.availability;
    return (
        <div
            className={classes.root}
            onClick={() =>
                history.push(CALENDAR_EVENT.replace(":id", "0"), {
                    date: d.iso
                })
            }
        >
            <div className={classes.dayname}>
                <Typography variant="subheading">{d.short}</Typography>
            </div>
            <Typography variant="display3">{d.num}</Typography>
            <div className={classes.availability}>
                <div
                    className={classNames("border-indicator", m.toLowerCase())}
                >
                    <Typography>{male + " x"}</Typography>
                    <i className="fas fa-male" />
                </div>
                <div
                    className={classNames("border-indicator", f.toLowerCase())}
                >
                    <Typography>{female + " x"}</Typography>
                    <i className="fas fa-female" />
                </div>
            </div>
        </div>
    );
};

export default consume({ styles, router: true, store: false })(
    CalendarDayTitle
);