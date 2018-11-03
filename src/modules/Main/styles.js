const drawerWidth = 300;
const topbarHeight = 128;
const sideMargins = 64;
const marginBottom = 16;

export default theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginBottom: marginBottom,
        marginRight: sideMargins,
        marginLeft: sideMargins,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    withSidebar: {
        marginLeft: drawerWidth
    },
    withTopbar: {
        minHeight: `calc(100vh - ${topbarHeight + marginBottom}px)`,
        marginTop: `${topbarHeight}px`
    },
    toolbar2: {
        marginRight: sideMargins,
        marginLeft: sideMargins,
        ".sidebar-open &": {
            marginLeft: drawerWidth
        },
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    }
});
