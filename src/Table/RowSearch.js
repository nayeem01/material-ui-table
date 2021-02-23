const RowSearch = (rows, searchTarget) => {
  const lowercase = searchTarget.toLowerCase();
  const searchedData = rows.filter((item) => {
    return Object.keys(item).some(
      (key) => typeof item[key] === 'string' && item[key].toLowerCase().includes(lowercase)
    );
  });
  return searchedData;
};
export default RowSearch;
