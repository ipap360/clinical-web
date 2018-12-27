import React from "react";
import {
    AppBar,
    Toolbar,
    Modal,
    Paper,
    IconButton,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";
import classNames from "classnames";

const styles = theme => ({
    root: {
        height: "auto",
        maxHeight: "calc(100vh - 120px)",
        width: 600,
        overflowY: "auto",
        marginTop: -250,
        top: "50%",
        position: "absolute",
        left: "50%",
        marginLeft: -300,
    },
    form: {
        "& > form": {
            width: "100%",
        },
    },
});

const ModalFormContainer = ({
    classes,
    className,
    variant,
    open,
    onClose,
    children,
    title,
    actions,
    titleProps = {},
    ...props
}) => (
    <Modal open={open} onClose={onClose} disableBackdropClick={true} {...props}>
        <Paper square className={classNames(classes.root, className, variant)}>
            <div>
                <AppBar position="static">
                    <Toolbar
                        style={{ justifyContent: "space-between" }}
                        disableGutters
                    >
                        <Toolbar>
                            <Typography
                                variant="title"
                                color="inherit"
                                {...titleProps}
                            >
                                {title}
                            </Typography>
                        </Toolbar>
                        <IconButton onClick={onClose} color="inherit">
                            <CancelIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar className={classes.form}>{children}</Toolbar>
            </div>
        </Paper>
    </Modal>
);

export default withStyles(styles)(ModalFormContainer);
