const drawerWidth = 300;
const topbarHeight = 128;
const sideMargins = 64;
const marginBottom = 16;

// '@media (min-width: 1025px)': {

// },

export default theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${topbarHeight + marginBottom}px)`,
        marginTop: `${topbarHeight}px`,
        marginBottom: marginBottom,
        marginRight: sideMargins,
        marginLeft: sideMargins,
        "&.sidebar-open": {
            marginLeft: drawerWidth,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    sidebar: {
        "& > div": {
            width: drawerWidth - theme.spacing.unit,
            padding: theme.spacing.unit * 4,
            // position: "relative",
            borderRight: "none"
        }
    },
    sideIcon: {
        margin: "0 8px"
    },
    menuTrigger: {
        fontSize: 32
    },
    menuCss: {
        margin: "0 8px",
    },
    toolbar2: {
        marginRight: sideMargins,
        marginLeft: sideMargins,
        ".sidebar-open &": {
            marginLeft: drawerWidth,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    // menuButton: {
    //     marginLeft: 12,
    //     marginRight: 20,
    // },
    // hide: {
    //     display: 'none',
    // },
    // drawerPaper: {
    //     position: 'relative',
    //     width: drawerWidth,
    // },
    // drawerHeader: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     padding: '0 8px',
    //     ...theme.mixins.toolbar,
    // },
    // content: {
    //     flexGrow: 1,
    //     backgroundColor: theme.palette.background.default,
    //     padding: theme.spacing.unit * 3,
    //     transition: theme.transitions.create('margin', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: theme.transitions.duration.leavingScreen,
    //     }),
    // },
    // 'content-left': {
    //     marginLeft: -drawerWidth,
    // },
    // 'content-right': {
    //     marginRight: -drawerWidth,
    // },
    // contentShift: {
    //     transition: theme.transitions.create('margin', {
    //         easing: theme.transitions.easing.easeOut,
    //         duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
    // 'contentShift-left': {
    //     marginLeft: 0,
    // },
    // 'contentShift-right': {
    //     marginRight: 0,
    // },
});