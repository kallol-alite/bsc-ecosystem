import { SET_COINGECKO_URL } from "../actions/actionTypes";

const farmingReducer = (
  state = {
    coingeckoUrls: [],
  },
  action
) => {
  switch (action.type) {
    case SET_COINGECKO_URL:
      return { ...state, coingeckoUrls: action.urls };
    default:
      return state;
  }
};

export default farmingReducer;
