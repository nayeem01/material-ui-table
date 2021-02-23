import React from "react";
import { IconButton, Typography, Toolbar } from "@material-ui/core";
import CheckBox from "./CheckBox";
import SearchIcon from "@material-ui/icons/Search";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import { ListItem } from "@material-ui/core";
import { CSVLink } from "react-csv";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import clsx from "clsx";
import exportPDF from "./exportPDF";
//import { orderListTableHeaders } from './tableHeadersAndFunctions';

import { lighten, makeStyles } from "@material-ui/core/styles";
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        display: "flex",
    },
    searchBar: {
        flex: ".7 ",
    },

    textField: {
        width: "50ch",
    },
    colView: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        justifyContent: "space-between",
    },
    filterView: {
        padding: theme.spacing(5),
        width: "50ch",
        backgroundColor: "#e0e0e0",
    },
    filterheader: {
        padding: theme.spacing(1),
        backgroundColor: "#e0e0e0",
    },
}));
const EnhancedTableToolbar = ({
    data,
    numSelected,
    onSearchChanged,
    closeSearch,
    col,
}) => {
    const [newCol, setnewCol] = React.useState([...col]);
    const [showSearch, setShowShearch] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const classes = useToolbarStyles();

    const onChange = (e) => {
        e.preventDefault();
        onSearchChanged(e.target.value);
    };
    const searchClose = () => {
        setShowShearch(false);
        closeSearch(showSearch);
    };

    //colview
    const handleCheckElement = (event) => {
        let items = [...newCol];
        items.forEach((item) => {
            if (item.id === event.target.value) {
                item.check = event.target.value;
            }
        });
        setnewCol(items);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickFilter = (event) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseFilter = () => {
        setAnchorElFilter(null);
    };

    const open = Boolean(anchorEl);
    const openFilter = Boolean(anchorElFilter);
    const idCol = open ? "colomn-popover" : undefined;
    const idFilter = openFilter ? "filter-popover" : undefined;

    //csv headers
    const headers = [
        { label: "order no", key: "orderNo" },
        { label: "customer", key: "customer" },
        { label: "product", key: "product" },
        { label: "date", key: "date" },
        { label: "status", key: "status" },
        { label: "method", key: "method" },
        { label: "total", key: "total" },
    ];
    //csv end

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : showSearch ? (
                <FormControl
                    className={classes.searchBar}
                    id="tableTitle"
                    variant="outlined"
                >
                    <InputLabel>Search</InputLabel>
                    <OutlinedInput
                        onChange={(e) => onChange(e)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => searchClose()}>
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={50}
                    />
                </FormControl>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    All Orders
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <div className={classes.toolsWrapper}>
                    <ListItem>
                        <Tooltip title="search">
                            <IconButton
                                aria-label="search"
                                onClick={() => setShowShearch(true)}
                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="csv download">
                            <IconButton aria-label="csv download">
                                <CSVLink
                                    data={data}
                                    headers={headers}
                                    filename={"orderlist.csv"}
                                    style={{ color: "#757575" }}
                                >
                                    <CloudDownloadIcon />
                                </CSVLink>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="print">
                            <IconButton
                                aria-label="print"
                                onClick={() =>
                                    exportPDF(
                                        data.map((elt) => [
                                            elt.orderNo,
                                            elt.customer,
                                            elt.product,
                                            elt.date,
                                            elt.status,
                                            elt.method,
                                            elt.total,
                                        ]),
                                        "Order List",
                                        headers.map((col) => col.label)
                                    )
                                }
                            >
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="">
                            <div>
                                <IconButton
                                    aria-label="view colomn"
                                    onClick={handleClick}
                                >
                                    <ViewWeekIcon />
                                </IconButton>
                                <Popover
                                    id={idCol}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                >
                                    <div className={classes.colView}>
                                        show columns
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon />
                                        </IconButton>
                                        <Grid container spacing={1}>
                                            <div>
                                                <ul>
                                                    {col.map((item, index) => (
                                                        <CheckBox
                                                            key={index}
                                                            handleCheckElement={
                                                                handleCheckElement
                                                            }
                                                            {...item}
                                                        />
                                                    ))}
                                                </ul>
                                            </div>
                                        </Grid>
                                    </div>
                                </Popover>
                            </div>
                        </Tooltip>
                        <Tooltip title="">
                            <div>
                                <IconButton
                                    aria-label="filter list"
                                    onClick={handleClickFilter}
                                >
                                    <FilterListIcon />
                                </IconButton>
                                <Popover
                                    id={idFilter}
                                    open={openFilter}
                                    anchorEl={anchorElFilter}
                                    onClose={handleCloseFilter}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                >
                                    <div>
                                        <div className={classes.filterheader}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={1}>
                                                    <h6>Filter</h6>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        color="secondary"
                                                    >
                                                        Reset
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <IconButton
                                                        onClick={
                                                            handleCloseFilter
                                                        }
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Grid container spacing={2}>
                                            <FormControl
                                                className={classes.filterView}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <Grid item xs={12}>
                                                    <FormGroup>
                                                        <TextField label="Order No" />
                                                        <TextField label="Product" />
                                                        <TextField label="Status" />
                                                        <TextField label="Total" />
                                                    </FormGroup>
                                                </Grid>
                                            </FormControl>

                                            <FormControl
                                                className={classes.filterView}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <Grid item xs={12}>
                                                    <FormGroup>
                                                        <TextField label="Customer" />
                                                        <TextField label="Date" />
                                                        <TextField label="Method" />
                                                    </FormGroup>
                                                </Grid>
                                            </FormControl>
                                        </Grid>
                                    </div>
                                </Popover>
                            </div>
                        </Tooltip>
                    </ListItem>
                </div>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
};

export default EnhancedTableToolbar;
