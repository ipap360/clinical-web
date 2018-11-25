import { headerBG, layoutStyles } from "../../components";

export default theme => ({
    ...layoutStyles(theme),
    root: {},
    paper: {
        flex: "1 auto",
        width: "100%",
        padding: theme.spacing.unit * 2
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
