import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import classNames from "classnames";
import styles from "./styles";
import Dotdotdot from "react-dotdotdot";

// const styles = theme => ({

//     root: {
//         color: theme.palette.text.primary,
//         fontFamily: theme.typography.fontFamily,
//         textAlign: "center"
//     }
// });

const PrintCalendar = ({ classes, title, dates, events, mode }) => (
    <div
        className={classNames(classes.calendar, classes.printCalendar, {
            [classes.calendarWeek]: mode === "w",
            [classes.calendarDay]: mode === "d"
        })}
    >
        <div
            className={classes.printTitle}
            style={{ gridColumn: `${1} / ${dates.length + 1}` }}
        >
            {title}
        </div>
        {dates.map((v, i) => (
            <div
                key={"d" + i}
                className={classes.printHead}
                style={{
                    gridColumn: `${i + 1} / ${i + 2}`
                }}
            >
                {v.format("ddd DD")}
            </div>
        ))}
        {events.map((data, i) => {
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
                isCompleted
            } = data;

            const patient = [name, code, patientNotes].join(" ");
            const text = eventNotes
                ? [patient, eventNotes].join(", ")
                : patient;

            return (
                <div
                    key={"e" + i}
                    color="inherit"
                    className={classes.printEvent}
                    style={{
                        gridColumn: `${start} / ${end + 1}`,
                        gridRowEnd: "span 2"
                        // gridRowEnd: span2 ? "span 2" : null
                    }}
                >
                    <Dotdotdot clamp={2}>{text}</Dotdotdot>
                </div>
            );
        })}
    </div>
);

export default withStyles(styles)(PrintCalendar);
