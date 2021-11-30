import { SET_LOADER_VISIBILITY, SET_IS_CONNECTED } from "../actions/actionTypes";

const masterReducer = (
  state = {
    showLoader: false,
    isConnected: false,
  },
  action
) => {
  switch (action.type) {
    case SET_LOADER_VISIBILITY:
      return { ...state, showLoader: action.status };
    case SET_IS_CONNECTED:
      return { ...state, isConnected: action.connectionStatus};
    default:
      return state;
  }
};

export default masterReducer;
