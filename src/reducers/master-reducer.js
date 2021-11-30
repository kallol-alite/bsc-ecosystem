import { SET_LOADER_VISIBILITY, SET_IS_WALLET_CONNECTED } from "../actions/actionTypes";

const masterReducer = (
  state = {
    showLoader: false,
    isWalletConnected: false,
  },
  action
) => {
  switch (action.type) {
    case SET_LOADER_VISIBILITY:
      return { ...state, showLoader: action.status };
    case SET_IS_WALLET_CONNECTED:
      return { ...state, isWalletConnected: action.connectionStatus};
    default:
      return state;
  }
};

export default masterReducer;
