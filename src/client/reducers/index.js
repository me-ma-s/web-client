import updateFilters from './filters';
import updateChannels from './channels';
import updateKeys from './keys';

const reducer = (state, action) => {
  return {
    filters: updateFilters(state, action),
    channels: updateChannels(state,action),
    keys : updateKeys(state,action),
  };
};

export default reducer;
