
const updateChannels = (state, action) => {

  if (state === undefined) {
    return {
      channelKey : null
    }
  }

  switch (action.type) {
    case 'UPDATE_KEYS':
      return ({
        ...state.keys,
        ...action.payload,
      })
    default:
      return state.keys;
  }
}

export default updateChannels