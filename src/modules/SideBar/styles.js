const drawerWidth = 300;
export default theme => {
    return {
        root: {
            "& > div": {
                width: drawerWidth - theme.spacing.unit,
                padding: `0 ${theme.spacing.unit * 4}px`,
                // position: "relative",
                borderRight: "none"
            }
        },
        main: {}
    };
};
