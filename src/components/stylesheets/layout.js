import { headerBG, hoverRowBG } from "./colors";
export default theme => ({
    header: {
        flex: "1 auto",
        position: "relative",
        backgroundColor: headerBG,
        padding: `10px ${theme.spacing.unit * 2}px`,
        width: "100%"
    },
    sidebar: {
        display: "flex",
        "flex-direction": "column",
        "justify-content": "flex-start",
        "align-items": "stretch",
        height: "100%",
        "margin-top": "32px",
        "margin-left": theme.spacing.unit,
        "& > div": {
            margin: `${theme.spacing.unit * 1.5}px 0`
        }
    },
    mainPaper: {
        flex: "1 auto",
        width: "100%"
    },
    notFound: {
        padding: theme.spacing.unit,
        color: theme.palette.text.secondary,
        fontStyle: "italic"
    },
    form: {
        width: 600
    },
    addBtn: {
        position: "fixed",
        bottom: theme.spacing.unit * 4.5,
        right: theme.spacing.unit * 4.5
    },
    section: {
        position: "relative",
        margin: `${theme.spacing.unit * 3}px 0`,
        paddingBottom: 40,
        minHeight: 200
    },
    sectionHeader: {
        justifyContent: "space-between"
    },
    sectionContent: {
        overflow: "auto"
    },
    sectionBtn: {
        position: "absolute",
        bottom: 10,
        right: -20
    }
});
