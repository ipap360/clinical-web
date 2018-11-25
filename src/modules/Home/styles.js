import { layoutStyles } from "../../components";
export default theme => ({
    ...layoutStyles(theme),
    calendarContent: {
        position: "relative",
        marginTop: 64,
        // height: '100%',
        flex: "1 auto",
        width: "100%",
        paddingTop: theme.spacing.unit,
        display: "grid",
        // 14.2857% 1fr
        gridTemplateColumns: "repeat(7, calc(14.2857% - 4px) [column])",
        gridAutoRows: "22px",
        gridColumnGap: `${theme.spacing.unit / 2}px`,
        gridRowGap: `${theme.spacing.unit / 2}px`,
        gridAutoFlow: "dense"
        // display: 'flex',
        // flexDirection: 'row'
    },
    topbarTitle: {
        display: "flex",
        alignItems: "center",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        "& > p": {
            textAlign: "center",
            width: 120
        },
        "& > button": {
            fontSize: 36
        },
        "& > *": {
            marginRight: 5
        }
    },
    topbarBody: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        background: "transparent"
    }
});
