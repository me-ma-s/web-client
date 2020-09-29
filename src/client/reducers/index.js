import updateFilters from './filters';

const reducer = (state, action) => {
  return {
    filters: updateFilters(state, action),
  };
};

export default reducer;
