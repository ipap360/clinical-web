import { layoutStyles } from "../../components";
export default theme => ({
    ...layoutStyles(theme),
    calendarContent: {
        ...layoutStyles(theme).mainPaper,
        position: "relative",
        marginTop: 64,
        paddingTop: theme.spacing.unit,
        gridAutoRows: "22px",
        gridColumnGap: `${theme.spacing.unit / 2}px`,
        gridRowGap: `${theme.spacing.unit / 2}px`
    },
    calendar: {
        display: "grid",
        gridAutoFlow: "dense"
    },
    calendarWeek: {
        gridTemplateColumns: "repeat(7, calc(14.2857% - 4px) [column])"
    },
    calendarDay: {
        gridTemplateColumns: "100%"
    },
    topbarBody: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        background: "transparent"
    },
    modeSwitch: {
        // border: "none",
        color: "inherit",
        marginLeft: theme.spacing.unit
    },
    periodTitle: {
        marginLeft: theme.spacing.unit,
        flex: "1 auto"
        // textAlign: "center"
    },
    printCalendar: {
        textAlign: "center",
        fontFamily: theme.typography.fontFamily,
        fontSize: 11,
        gridColumnGap: `2px`,
        gridRowGap: `2px`
    },
    printTitle: {
        borderBottom: "1px dotted",
        padding: 4
    },
    printHead: {
        borderBottom: "2px solid"
    },
    printEvent: {
        border: "1px solid",
        textAlign: "left",
        padding: "0 2px",
        fontSize: "inherit",
        lineHeight: "1.2em"
        // whiteSpace: "nowrap",
        // overflow: "hidden",
        // textOverflow: "ellipsis"
    }
});
