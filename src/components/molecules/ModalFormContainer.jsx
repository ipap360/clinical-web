import React from "react";
import {
    AppBar,
    Toolbar,
    Modal,
    Paper,
    Typography,
    withStyles
} from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        height: 500,
        width: 600,
        overflowY: "auto",
        marginTop: -250,
        top: "50%",
        position: "absolute",
        left: "50%",
        marginLeft: -300,
        "&.short": {
            height: 300
        }
    },
    form: {}
});

const ModalFormContainer = ({
    classes,
    className,
    variant,
    open,
    onClose,
    children,
    title,
    titleProps = {},
    ...props
}) => (
    <Modal open={open} onClose={onClose} {...props}>
        <Paper square className={classNames(classes.root, className, variant)}>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="title"
                            color="inherit"
                            {...titleProps}
                        >
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar>{children}</Toolbar>
            </div>
        </Paper>
    </Modal>
);

export default withStyles(styles)(ModalFormContainer);
