import { headerBG } from "./colors";
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
    form: {
        width: 600
    },
    addBtn: {
        position: "fixed",
        bottom: theme.spacing.unit * 4.5,
        right: theme.spacing.unit * 4.5
    }
});
