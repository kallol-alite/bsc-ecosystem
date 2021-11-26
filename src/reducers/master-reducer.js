import { SET_LOADER_VISIBILITY } from "../actions/actionTypes";

const masterReducer = (
  state = {
    showLoader: false,
  },
  action
) => {
  switch (action.type) {
    case SET_LOADER_VISIBILITY:
      return { ...state, showLoader: action.status };
    default:
      return state;
  }
};

export default masterReducer;
