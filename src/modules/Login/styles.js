export default theme => {
    return {
        wrapper: {
            background: theme.palette.background.default,
        },
        container: {
            margin: "0 auto",
        },
        pad: {
            padding: theme.spacing.unit * 1,
        },
        loginForm: {
            width: 350,
        },
    };
};
