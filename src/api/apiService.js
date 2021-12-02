import request from "../utils/api-service";
import { COINGECKO_PRICE_END_POINT } from "../App.Config";

export function getCoingeckoUrl() {
  return request(COINGECKO_PRICE_END_POINT, "get")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
