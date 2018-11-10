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
    modal: {
        height: 500,
        width: 600,
        overflowY: "auto",
        marginTop: -250,
        top: "50%",
        position: "absolute",
        left: "50%",
        marginLeft: -300,
        "&.short": {
            height: 300
        }
    },
    form: {
        width: 600
    },
    modalform: {},
    sidebar: {
        display: "flex",
        "flex-direction": "column",
        "justify-content": "flex-start",
        "align-items": "stretch",
        height: "100%",
        "margin-top": "32px",
        "margin-left": theme.spacing.unit,
        "& > div": {
            marginBottom: theme.spacing.unit * 3
        }
    }
});
