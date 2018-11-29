import { headerBG, hoverRowBG } from "./colors";
export default theme => {
    return {
        root: {
            padding: theme.spacing.unit * 3
        },
        fixedHeader: {
            "& > thead > tr": {
                position: "fixed"
            }
        },
        row: {
            display: "flex",
            alignItems: "center",
            padding: `${theme.spacing.unit * 1.5}px 0`,
            cursor: "pointer",
            "&:hover": {
                backgroundColor: hoverRowBG
            },
            "&:not(:last-child)": {
                borderBottom: `1px solid ${theme.palette.divider}`
            }
        },
        col: {
            padding: `0 ${theme.spacing.unit / 2}px`
        }
    };
};
