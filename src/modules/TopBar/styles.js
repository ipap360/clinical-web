const drawerWidth = 300;
// const topbarHeight = 128;
const sideMargins = 64;
// const marginBottom = 16;

export default theme => ({
    // root: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     minHeight: `calc(100vh - ${topbarHeight + marginBottom}px)`,
    //     marginTop: `${topbarHeight}px`,
    //     marginBottom: marginBottom,
    //     marginRight: sideMargins,
    //     marginLeft: sideMargins,
    //     "&.sidebar-open": {
    //         marginLeft: drawerWidth,
    //     },
    //     transition: theme.transitions.create(['margin', 'width'], {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    root: {
        zIndex: theme.zIndex.drawer + 1
    },
    homeTrigger: {
        margin: `0 ${theme.spacing.unit}px`,
        padding: `0 ${theme.spacing.unit}px`,
        minWidth: 0,
        fontSize: 25
    },
    menuTrigger: {
        fontSize: 32
    },
    menuCss: {
        // margin: "0 8px 0 0"
    },
    topbarNav: {
        flex: "1 auto",
        display: "flex",
        alignItems: "center",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        "& > a": {
            padding: theme.spacing.unit
        },
        "& > h2": {
            textAlign: "center",
            width: 240
        },
        "& > button": {
            fontSize: 36
        },
        "& > *": {
            marginRight: 5
        }
    },
    toolbar2: {
        marginRight: sideMargins,
        marginLeft: sideMargins,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    withSidebar: {
        marginLeft: drawerWidth
    },
    titleCss: {
        marginRight: theme.spacing.unit * 3
    }
});
