const defaultState = () => {
  return {
    search: '',
    sort: 'ratingRank1',
    rankTo: 1000,
    period: 'actual',
    profile: 'all',
    isCompare: false,
    period2: 'actual',
    profile2: 'all',
    top: 'all'
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

    case 'FILTERS_ALL_CHANGED':
      return {
        ...state.filters,
        ...action.filters
      };

    default:
      return state.filters;
  }
};

export default updateFilters;
