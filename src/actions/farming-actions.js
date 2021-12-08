import * as API from "../api/apiService";
import { SET_COINGECKO_URL } from "./actionTypes";

export const setCoinGecko = (urls) => {
  return {
    type: SET_COINGECKO_URL,
    urls,
  };
};

export function getCoingeckoUrls() {
  return (dispatch) => {
    API.getCoingeckoUrl().then(
      (result) => {
        dispatch(setCoinGecko(result));
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
