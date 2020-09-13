const filtersChanged = ({name, value}) => {
  return {
    type: 'FILTERS_CHANGED',
    name,
    value
  };
};



export {
  filtersChanged,
}

