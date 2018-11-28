import { layoutStyles } from "../../components";
export default theme => ({
    ...layoutStyles(theme),
    calendarContent: {
        ...layoutStyles(theme).mainPaper,
        position: "relative",
        marginTop: 64,
        // height: '100%',
        paddingTop: theme.spacing.unit,
        display: "grid",
        // 14.2857% 1fr

        gridAutoRows: "22px",
        gridColumnGap: `${theme.spacing.unit / 2}px`,
        gridRowGap: `${theme.spacing.unit / 2}px`,
        gridAutoFlow: "dense"
        // display: 'flex',
        // flexDirection: 'row'
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
    }
});
