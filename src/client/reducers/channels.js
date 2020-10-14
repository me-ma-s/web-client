
const updateChannels = (state, action) => {

  if (state === undefined) {
    return []
  }

  switch (action.type) {
    case 'SET_CHANNELS':
      return action.payload ;
    case 'UPDATE_CHANNELS':
      return ([
        ...state.channels,
        ...action.payload,
      ])
    case 'DROP_CHANNELS':
      return [];
    default:
      return state.channels;
  }
}

export default updateChannels