const defaultState = () => {
  return {
    test: '',
  };
};

const updateFilters = (state, action) => {

  if (state === undefined) {
    return defaultState();
  }

  switch (action.type) {

    case 'FILTERS_CHANGED':
      return {
        ...state.filters,
        [action.name] : action.value
      };

    default:
      return state.filters;
  }
};

export default updateFilters;
