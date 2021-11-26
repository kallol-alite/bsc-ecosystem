import { SET_LOADER_VISIBILITY } from "./actionTypes";

export function setLoaderVisibility(isOpen) {
  return {
    type: SET_LOADER_VISIBILITY,
    status: isOpen,
  };
}
