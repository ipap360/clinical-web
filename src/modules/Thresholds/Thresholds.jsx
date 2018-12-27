import React, { Component } from "react";
import {
    TTypography,
    tableStyles,
    layoutStyles,
    headerBG,
    ModalFormContainer,
    hoverRowBG,
    ButtonWithAlert,
} from "../../components";

import { Paper, AppBar, Toolbar, IconButton, Fab } from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { consume } from "../../context";
import { fetchThresholds, deleteThreshold, getThresholds } from "./store";
import ThresholdForm from "./ThresholdForm";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";

const styles = theme => ({
    ...layoutStyles(theme),
    ...tableStyles(theme),
    table: {
        minHeight: 100,
        tableLayout: "fixed",
        borderCollapse: "collapse",
        borderSpacing: 0,
    },
    header: {
        backgroundColor: headerBG,
        width: "100%",
    },
    rowStyle: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: hoverRowBG,
        },
    },
    col2: { width: 130, textAlign: "center" },
    colorPreview: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "inline-block",
    },
    // needs refactoring (remove code duplication)
    modalFormWrap: {
        display: "flex",
        width: "100%",
    },
    modalForm: {
        flex: "1 auto",
    },
    modalSideActions: {
        justifyContent: "flex-end",
        flexDirection: "column",
        flex: "none",
        display: "flex",
        margin: `${theme.spacing.unit * 2}px -${theme.spacing.unit *
            3}px ${theme.spacing.unit * 2}px 0px`,
    },
});

const DeleteThreshold = ({ t, onClick }) => (
    <ButtonWithAlert
        Component={IconButton}
        alertTitle={t("Are you sure you want to delete this indicator?")}
        color="inherit"
        onClick={onClick}
    >
        <DeleteIcon />
    </ButtonWithAlert>
);

class Thresholds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: null,
        };
    }

    componentDidMount() {
        const { fetchThresholds } = this.props;
        fetchThresholds();
    }

    componentWillUnmount() {}

    handleRowClick = evt => {
        const id = evt.currentTarget.dataset["id"];
        this.setState({
            modal: true,
            modalId: parseInt(id, 10),
        });
    };

    handleModalClose = () => {
        this.setState({
            modal: false,
            modalId: null,
        });
    };

    onAddThreshold = (...args) => {
        const { fetchThresholds } = this.props;
        this.handleModalClose();
        fetchThresholds();
    };

    onDelete = () => {
        const { fetchThresholds } = this.props;
        this.handleModalClose();
        fetchThresholds();
    };

    render() {
        const { thresholds, t, classes, deleteThreshold } = this.props;
        const {
            rowStyle,
            section,
            col2,
            sectionHeader,
            sectionBtn,
            colorPreview,
            notFound,
        } = classes;

        return (
            <Paper className={section} square>
                <AppBar position="static" color="default">
                    <Toolbar className={sectionHeader}>
                        <TTypography variant="subtitle1">
                            Availability Indicators
                        </TTypography>
                        <TTypography variant="caption">
                            lowest matched threshold applies
                        </TTypography>
                    </Toolbar>
                </AppBar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Description")}</TableCell>
                            <TableCell className={col2}>{t("Color")}</TableCell>
                            <TableCell numeric>{t("Threshold")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!thresholds.length && (
                            <TableRow>
                                <TableCell colSpan={3} className={notFound}>
                                    {t(
                                        "There are no availability indicators registered"
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                        {thresholds.map(row => {
                            const style = row.indicator
                                ? { backgroundColor: row.indicator }
                                : {};
                            return (
                                <TableRow
                                    key={row.id}
                                    data-id={row.id}
                                    onClick={this.handleRowClick}
                                    className={rowStyle}
                                >
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell className={col2}>
                                        <div
                                            className={colorPreview}
                                            style={{
                                                ...style,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell numeric>
                                        {row.threshold}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <ModalFormContainer
                    open={this.state.modal}
                    onClose={this.handleModalClose}
                    title={t("Indicator")}
                >
                    <div className={classes.modalFormWrap}>
                        <ThresholdForm
                            id={this.state.modalId}
                            className={classes.modalForm}
                            onSaveSuccess={this.onAddThreshold}
                        />
                        {this.state.modalId !== 0 && (
                            <div className={classes.modalSideActions}>
                                <DeleteThreshold
                                    t={t}
                                    onClick={() => {
                                        deleteThreshold(this.state.modalId, {
                                            onOK: this.onDelete,
                                        });
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </ModalFormContainer>
                <Fab
                    size="small"
                    className={sectionBtn}
                    color="secondary"
                    data-id={0}
                    onClick={this.handleRowClick}
                >
                    <AddIcon />
                </Fab>
            </Paper>
        );
    }
}

const s2p = state => ({
    thresholds: getThresholds(state),
});

const d2p = {
    fetchThresholds,
    deleteThreshold,
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(Thresholds);
