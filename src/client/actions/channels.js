const setChannels = ( arr ) => {
  return {
    type: 'SET_CHANNELS',
    payload : arr
  };
};

const updateChannels = ( arr ) => {
  return {
    type: 'UPDATE_CHANNELS',
    payload : arr
  };
};

const dropChannels = (  ) => {
  return {
    type: 'DROP_CHANNELS',
  };
};

export {
  setChannels,
  dropChannels,
  updateChannels,
}