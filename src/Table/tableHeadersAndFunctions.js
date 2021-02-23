function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const orderListTableHeaders = [
  {
    id: 'orderNo',
    numeric: false,
    disablePadding: true,
    label: 'Order No.',
    check: true,
  },
  { id: 'customer', numeric: true, disablePadding: false, label: 'Customer', check: true },
  { id: 'product', numeric: true, disablePadding: false, label: 'Product', check: true },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date', check: true },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    check: true,
  },
  {
    id: 'method',
    numeric: true,
    disablePadding: false,
    label: 'Method',
    check: true,
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
    check: true,
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    check: true,
  },
];
