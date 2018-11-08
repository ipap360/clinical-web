const drawerWidth = 300;
export default theme => {
    return {
        root: {
            "& > div": {
                width: drawerWidth - theme.spacing.unit,
                padding: theme.spacing.unit * 4,
                // position: "relative",
                borderRight: "none"
            }
        },
        main: {}
    };
};
