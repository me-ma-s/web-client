import updateFilters from './filters';
import updateChannels from './channels'

const reducer = (state, action) => {
  return {
    filters: updateFilters(state, action),
    channels: updateChannels(state,action),
  };
};

export default reducer;
