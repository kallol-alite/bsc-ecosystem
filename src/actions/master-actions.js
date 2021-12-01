import { SET_LOADER_VISIBILITY,SET_SIDEBAR_VISIBILITY } from "./actionTypes";

export function setLoaderVisibility(isOpen) {
  return {
    type: SET_LOADER_VISIBILITY,
    status: isOpen,
  };
}
export function setSidebarView(status,title) {
  return {    
    type: SET_SIDEBAR_VISIBILITY,
    status    
  };
}
