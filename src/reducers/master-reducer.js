import { SET_LOADER_VISIBILITY, SET_IS_CONNECTED, SET_DAPP_TXN_ERROR_QUEUE, SET_DAPP_TXN_SUCCESS_QUEUE } from "../actions/actionTypes";

const masterReducer = (
  state = {
    showLoader: false,
    isConnected: false,
    transactionErrorQueue: [],
    transactionSuccessQueue: [],
  },
  action
) => {
  switch (action.type) {
    case SET_LOADER_VISIBILITY:
      return { ...state, showLoader: action.status };
    case SET_IS_CONNECTED:
      return { ...state, isConnected: action.connectionStatus };
    case SET_DAPP_TXN_ERROR_QUEUE:
      return { ...state, transactionErrorQueue: [action.error, ...state.transactionErrorQueue] };
    case SET_DAPP_TXN_SUCCESS_QUEUE:
      return { ...state, transactionSuccessQueue: [action.success, ...state.transactionSuccessQueue] };
    default:
      return state;
  }
};

export default masterReducer;
