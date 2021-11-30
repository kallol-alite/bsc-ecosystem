import { SET_LOADER_VISIBILITY, SET_IS_CONNECTED } from "./actionTypes";

export function setLoaderVisibility(isOpen) {
  return {
    type: SET_LOADER_VISIBILITY,
    status: isOpen,
  };
}

export function setIsConnected(value) {
  return {
    type: SET_IS_CONNECTED,
    connectionStatus: value,
  }
}
