import React from "react";
import { Typography } from "@material-ui/core";
// import classNames from "classnames";
// import { CALENDAR_EVENT } from "../routes";
import { consume } from "../../context";
import { NavButton } from "../../components";

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
        borderRadius: 0,
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
        borderBottom: "4px solid transparent"
    }
});

const AvailabilityIndicators = ({ classes, male, female, m, f }) => {
    const mStyle = m.color ? { borderColor: m.color } : {};
    const fStyle = f.color ? { borderColor: f.color } : {};

    return (
        <div className={classes.availability}>
            <div
                className={classes.indicator}
                style={{ ...mStyle }}
                title={m.text ? m.text + " (" + m.number + ")" : ""}
            >
                <Typography>{male}</Typography>
                <i className="fas fa-male" />
            </div>
            <div
                className={classes.indicator}
                style={{ ...fStyle }}
                title={f.text ? f.text + " (" + f.number + ")" : ""}
            >
                <Typography>{female}</Typography>
                <i className="fas fa-female" />
            </div>
        </div>
    );
};

const CalendarDayTitle = ({ classes, newURL, d, availability }) => {
    return (
        <NavButton className={classes.root} to={newURL}>
            <div className={classes.dayname}>
                <Typography variant="subheading">{d.format("ddd")}</Typography>
            </div>
            <Typography variant="display3">{d.format("D")}</Typography>
            {availability && (
                <AvailabilityIndicators classes={classes} {...availability} />
            )}
        </NavButton>
    );
};

export default consume({ styles, store: false })(CalendarDayTitle);
