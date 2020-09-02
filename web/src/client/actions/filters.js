const filtersChanged = ({name, value}) => {
  return {
    type: 'FILTERS_CHANGED',
    name,
    value
  };
};

const filtersAllChanged = (filters) => {
  return {
    type: 'FILTERS_ALL_CHANGED',
    filters
  };
};

const filtersDocsChanged = ({name, value}) => {
  return {
    type: 'FILTERS_DOCS_CHANGED',
    name,
    value
  };
};

const filtersAllDocsChanged = (filters) => {
  return {
    type: 'FILTERS_ALL_DOCS_CHANGED',
    filters
  };
};

export {
  filtersChanged,
  filtersDocsChanged,
  filtersAllChanged,
  filtersAllDocsChanged
}

