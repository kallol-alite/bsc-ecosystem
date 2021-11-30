import { SET_LOADER_VISIBILITY, SET_IS_WALLET_CONNECTED } from "./actionTypes";

export function setLoaderVisibility(isOpen) {
  return {
    type: SET_LOADER_VISIBILITY,
    status: isOpen,
  };
}

export function setIsWalletConnected(value) {
  return {
    type: SET_IS_WALLET_CONNECTED,
    connectionStatus: value,
  }
}
