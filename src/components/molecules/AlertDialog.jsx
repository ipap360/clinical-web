import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import { Trans } from "react-i18next";

const AlertDialog = ({
    title,
    body,
    bodyProps,
    okText = "Yes",
    cancelText = "No",
    isOpen,
    onOK,
    onCancel
}) => (
    <div>
        <Dialog
            open={isOpen}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {title && (
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            )}
            {body && (
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        {...bodyProps}
                    >
                        <Trans>{body}</Trans>
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    {cancelText}
                </Button>
                <Button onClick={onOK} color="primary" autoFocus>
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

export default AlertDialog;
