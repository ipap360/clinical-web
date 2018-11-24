export default theme => {
    return {
        root: {
            padding: theme.spacing.unit * 3
        },
        fixedHeader: {
            "& > thead > tr": {
                position: "fixed"
            }
        }
    };
};
