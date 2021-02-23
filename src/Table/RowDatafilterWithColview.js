const RowDatafilterWithColview = (cols, data) => {
  const allowed = cols.filter((item) => item.check === true).map((key) => key.id);
  const newRow = data.map((item) => {
    return Object.keys(item)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {});
  });

  return newRow;
};
export default RowDatafilterWithColview;
