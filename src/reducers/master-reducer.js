import { SET_LOADER_VISIBILITY, SET_SIDEBAR_VISIBILITY } from "../actions/actionTypes";

const masterReducer = (
  state = {
    showLoader: false,
    isSidebarOpen: true,
  },
  action
) => {
  switch (action.type) {
    case SET_LOADER_VISIBILITY:
      return { ...state, showLoader: action.status };
    case SET_SIDEBAR_VISIBILITY:
      return { ...state, isSidebarOpen: action.status };
    default:
      return state;
  }
};

export default masterReducer;
