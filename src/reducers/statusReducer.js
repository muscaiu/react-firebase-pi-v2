const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STATUS_ON': {
      return { ...state, reduxStatus: true }
    }
    case 'STATUS_OFF': {
      return { ...state, reduxStatus: false }
    }
    case 'STATUS_ERROR': {
      console.log('STATUS_ERROR', action.err)
      return state;
    }
    default: {
      return state;
    }
  }
};
export default statusReducer;
