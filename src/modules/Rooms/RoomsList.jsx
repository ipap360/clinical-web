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
import { fetchRooms, getRooms } from "./store";
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
    }
});

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

    render() {
        const { rooms, t, classes } = this.props;
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
                                <TableCell colspan={2} className={notFound}>
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
                    <RoomForm
                        id={this.state.modalId}
                        className={classes.modalform}
                        onSaveSuccess={this.onAddRoom}
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
    rooms: getRooms(state)
});

const d2p = {
    fetchRooms
};

const store = { s2p, d2p };
export default consume({ store, styles, router: true })(RoomsList);
