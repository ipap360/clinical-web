export default theme => ({
    root: {},
    paper: {
        flex: "1 auto",
        width: "100%",
        padding: theme.spacing.unit * 2
    },
    header: {
        flex: "1 auto",
        position: "relative",
        backgroundColor: "#e4eb30",
        // color: theme.palette.getContrastText('#e4eb30'),
        padding: `10px ${theme.spacing.unit * 2}px`,
        width: "100%"
    },
    title: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginTop: 10
    },
    subtitle: {
        position: "absolute",
        top: 0,
        lineHeight: "1em",
        margin: "6px 1px"
    },
    form: {
        width: 600
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
    sideMsg: {
        fontSize: 24,
        textAlign: "center"
    },
    sideCopied: {
        color: theme.palette.primary.main
    },
    sidePostponed: {
        color: theme.palette.error.main
    }
});
