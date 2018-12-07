import React, { Component } from "react";
import {
    TTypography,
    tableStyles,
    layoutStyles,
    headerBG,
    ModalFormContainer,
    hoverRowBG,
    ButtonWithAlert
} from "../../components";

import { Paper, AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { consume } from "../../context";
import { fetchRooms, getRooms, deleteRoom } from "./store";
import RoomForm from "./RoomForm";
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
    },
    modalFormWrap: {
        display: "flex",
        width: "100%"
    },
    modalForm: {
        flex: "1 auto"
    },
    modalSideActions: {
        justifyContent: "flex-end",
        flexDirection: "column",
        flex: "none",
        display: "flex",
        margin: `${theme.spacing.unit * 2}px -${theme.spacing.unit *
            3}px ${theme.spacing.unit * 2}px 0px`
    }
});

const DeleteRoom = ({ t, onClick }) => (
    <ButtonWithAlert
        Component={IconButton}
        alertTitle={t("Are you sure you want to delete this room?")}
        // color="secondary"
        onClick={onClick}
    >
        <DeleteIcon />
    </ButtonWithAlert>
);

class RoomsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalId: null
        };
    }

    componentDidMount() {
        const { fetchRooms } = this.props;
        fetchRooms();
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

    onAddRoom = (...args) => {
        const { fetchRooms } = this.props;
        this.handleModalClose();
        fetchRooms();
    };

    onDelete = () => {
        const { fetchRooms } = this.props;
        this.handleModalClose();
        fetchRooms();
    };

    render() {
        const { rooms, t, classes, deleteRoom } = this.props;
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
                        <TTypography variant="subtitle1">Rooms</TTypography>
                    </Toolbar>
                </AppBar>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Room")}</TableCell>
                            <TableCell numeric>{t("Capacity")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!rooms.length && (
                            <TableRow>
                                <TableCell colSpan={2} className={notFound}>
                                    {t("There are no rooms registered")}
                                </TableCell>
                            </TableRow>
                        )}
                        {rooms.map(row => {
                            return (
                                <TableRow
                                    key={row.id}
                                    data-id={row.id}
                                    onClick={this.handleRowClick}
                                    className={rowStyle}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell numeric>
                                        {row.capacity}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <ModalFormContainer
                    open={this.state.modal}
                    onClose={this.handleModalClose}
                    title={t("Room")}
                >
                    <div className={classes.modalFormWrap}>
                        <RoomForm
                            id={this.state.modalId}
                            className={classes.modalForm}
                            onSaveSuccess={this.onAddRoom}
                        />
                        {this.state.modalId !== 0 && (
                            <div className={classes.modalSideActions}>
                                <DeleteRoom
                                    t={t}
                                    onClick={() => {
                                        deleteRoom(this.state.modalId, {
                                            onOK: this.onDelete
                                        });
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </ModalFormContainer>
                <Button
                    variant="fab"
                    mini
                    className={sectionBtn}
                    color="secondary"
                    data-id={0}
                    onClick={this.handleRowClick}
                >
                    <AddIcon />
                </Button>
            </Paper>
        );
    }
}

const s2p = state => ({
    rooms: getRooms(state)
});

const d2p = {
    fetchRooms,
    deleteRoom
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(RoomsList);
