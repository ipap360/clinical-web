import React, { Component } from "react";
import {
    TTypography,
    tableStyles,
    layoutStyles,
    headerBG,
    ModalFormContainer,
    hoverRowBG
} from "../../components";

import { Paper, Icon, AppBar, Toolbar, Button } from "@material-ui/core";
import { consume } from "../../context";
import { fetchThresholds, getThresholds } from "./store";
import ThresholdForm from "./ThresholdForm";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core";

const styles = theme => ({
    ...layoutStyles(theme),
    ...tableStyles(theme),
    table: {
        minHeight: 100,
        tableLayout: "fixed",
        borderCollapse: "collapse",
        borderSpacing: 0
    },
    header: {
        backgroundColor: headerBG,
        width: "100%"
    },
    rowStyle: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: hoverRowBG
        }
    },
    col2: {
        width: 100,
        flex: "none"
    }
});

class Thresholds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: null
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
            modalId: parseInt(id, 10)
        });
    };

    handleModalClose = () => {
        this.setState({
            modal: false,
            modalId: null
        });
    };

    onAddThreshold = (...args) => {
        const { fetchThresholds } = this.props;
        this.handleModalClose();
        fetchThresholds();
    };

    render() {
        const { thresholds, t, classes } = this.props;
        const {
            rowStyle,
            section,
            sectionHeader,
            sectionBtn,
            notFound
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
                            <TableCell>{t("Color")}</TableCell>
                            <TableCell numeric>{t("Threshold")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!thresholds.length && (
                            <TableRow>
                                <TableCell colspan={3} className={notFound}>
                                    {t(
                                        "There are no availability indicators registered"
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                        {thresholds.map(row => {
                            return (
                                <TableRow
                                    key={row.id}
                                    data-id={row.id}
                                    onClick={this.handleRowClick}
                                    className={rowStyle}
                                >
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.indicator}</TableCell>
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
                    title={t("Threshold")}
                >
                    <ThresholdForm
                        id={this.state.modalId}
                        className={classes.modalform}
                        onSaveSuccess={this.onAddThreshold}
                    />
                </ModalFormContainer>
                <Button
                    variant="fab"
                    mini
                    className={sectionBtn}
                    color="secondary"
                    data-id={0}
                    onClick={this.handleRowClick}
                >
                    <Icon>add</Icon>
                </Button>
            </Paper>
        );
    }
}

const s2p = state => ({
    thresholds: getThresholds(state)
});

const d2p = {
    fetchThresholds
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(Thresholds);
