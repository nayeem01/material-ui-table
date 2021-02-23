import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    Badge,
    createMuiTheme,
} from "@material-ui/core";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { ThemeProvider } from "@material-ui/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import { stableSort, getComparator } from "./tableHeadersAndFunctions";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import RowDatafilterWithColview from "./RowDatafilterWithColview";
import RowSearch from "./RowSearch";
import { orderListTableHeaders } from "./tableHeadersAndFunctions";
import { alldata } from "./DummyData";
//import { setDeletedRowID } from '../../../redux/slices/tableSlice';
const themeStatus = createMuiTheme({
    palette: {
        primary: {
            main: "#11cb5f",
        },
        secondary: {
            main: "#ffea00",
        },
        check: {
            main: "#b2102f",
        },
    },
});

const themeButton = createMuiTheme({
    palette: {
        primary: {
            main: "#4caf50",
        },
        secondary: {
            main: "#b71c1c0",
        },
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
    },
    table: {
        minWidth: 700,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    toolsWrapper: {
        // marginLeft: 950,
        display: "flex",
        justifyContent: "space-around",
        cursor: "pointer",
        color: "#08AD6C",
    },

    notFoundMassage: {
        display: "flex",
        justifyContent: "space-around",
    },
}));

export default function OrderTable() {
    //const dispatch = useDispatch();
    const rows = [...alldata];
    const cols = [...orderListTableHeaders];

    //const selected = useSelector((state) => state.entities.table.deletedRowID);
    const [selected, setSelected] = React.useState([]);

    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [searchTarget, setSearchTarget] = React.useState("");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const searchedData = RowSearch(rows, searchTarget);
    const newRow = RowDatafilterWithColview(cols, searchedData);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.total);
            setSelected(newSelecteds);
            //dispatch(setDeletedRowID({ id: newSelecteds }));
            return;
        }
        setSelected([]);
        // dispatch(setDeletedRowID({ id: [] }));
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        //dispatch(setDeletedRowID({ id: newSelected }));
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root} data-testid="ordertable">
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    data={rows}
                    onSearchChanged={(value) => {
                        setSearchTarget(value);
                    }}
                    closeSearch={(value) => {
                        if (value) {
                            setSearchTarget("");
                        }
                    }}
                    col={cols}
                />
                {!searchedData.length ? (
                    <div className={classes.notFoundMassage}>
                        Sorry Search item not found !!! 😭
                    </div>
                ) : (
                    <div>
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                    rows={rows}
                                    cols={cols}
                                />

                                <TableBody>
                                    {stableSort(
                                        newRow,
                                        getComparator(order, orderBy)
                                    )
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(
                                                row.total
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            row.total
                                                        )
                                                    }
                                                    role="checkbox"
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    key={index}
                                                    selected={isItemSelected}
                                                    data-testid="rowcount"
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={
                                                                isItemSelected
                                                            }
                                                            inputProps={{
                                                                "aria-labelledby": labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.orderNo}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.customer}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.product}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.date}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        data-testid="status"
                                                    >
                                                        <ThemeProvider
                                                            theme={themeStatus}
                                                        >
                                                            <Badge
                                                                badgeContent={
                                                                    row.status
                                                                }
                                                                color={
                                                                    row.status ===
                                                                    "Delivered"
                                                                        ? "primary"
                                                                        : row.status ===
                                                                          "Cancelled"
                                                                        ? "error"
                                                                        : "secondary"
                                                                }
                                                            ></Badge>
                                                        </ThemeProvider>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.method}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        ${row.total}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <ThemeProvider
                                                            theme={themeButton}
                                                        >
                                                            <IconButton
                                                                aria-label="delete"
                                                                className={
                                                                    classes.margin
                                                                }
                                                            >
                                                                <CheckIcon
                                                                    fontSize="small"
                                                                    color="primary"
                                                                />
                                                            </IconButton>
                                                            <IconButton
                                                                aria-label="delete"
                                                                className={
                                                                    classes.margin
                                                                }
                                                            >
                                                                <ClearIcon
                                                                    fontSize="small"
                                                                    color="secondary"
                                                                />
                                                            </IconButton>
                                                            <IconButton
                                                                href={`/orders/${row.orderNo}`}
                                                                aria-label="delete"
                                                                className={
                                                                    classes.margin
                                                                }
                                                            >
                                                                <ArrowRightAltIcon />
                                                            </IconButton>
                                                        </ThemeProvider>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            data-testid="pagination"
                            rowsPerPageOptions={[6, 12, 24]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                )}
            </Paper>
        </div>
    );
}
