import React from "react";
import PropTypes from "prop-types";
import {
    // Paper,
    Table,
    // Portal,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    withStyles
} from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
    root: {
        width: "100%",
        borderRadius: 0,
        // marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        // minWidth: 700
    }
});

function readColumn(column) {
    let text = column;
    let props = {};
    let style = { flex: "1 auto" };
    if (typeof column == "object") {
        let { t, w, style: columnStyle, ...other } = column;
        text = t;
        if (w) {
            style = {
                width: w,
                flex: "none",
                ...columnStyle
            };
        }
        props = other;
    }
    props = { style, ...props };
    return {
        text,
        ...props
    };
}

function SimpleTable(props) {
    const { classes, className, data, headerContainer, ...other } = props;
    const { id, body, head } = data;
    return (
        <Table className={classNames(classes.root, className)} {...other}>
            <TableHead>
                {head.map((row, i) => {
                    const key = id + "header" + i;
                    return (
                        <TableRow key={key}>
                            {row.map((col, j) => {
                                const { text, ...props } = readColumn(col);
                                const columnKey = key + "column" + j;
                                return (
                                    <TableCell key={columnKey} {...props}>
                                        {text}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableHead>
            <TableBody>
                {body.map((row, i) => {
                    const { id: rowId, columns, ...cellProps } = row;
                    const key = id + "row" + rowId;

                    return (
                        <TableRow key={key}>
                            {columns.map((col, j) => {
                                const { text, ...props } = readColumn(col);
                                const columnKey = key + "column" + j;
                                return (
                                    <TableCell
                                        key={columnKey}
                                        {...cellProps}
                                        {...props}
                                    >
                                        {text}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
