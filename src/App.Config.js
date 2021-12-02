export const CONTRACT_ADDRESS = {
  TOKEN: {
    FORWARD: "", //DEVELOPMENT,
    // FORWARD: '', //PRODUCTION,
  },
  FARMING: {
    BSC: "0xc2463998c97368C5981dfe3eCcA0528dF458631A", //DEVELOPMENT
    TOKEN: "0x2dA7daE64D1cf0122096aA52A67C4bCA363Cc372", //DEVELOPMENT
    // BSC: '', //PRODUCTION
  },
};

export const ALLOWED_NETWORKS = {
  FARMING: {
    BSC: 137, //DEVELOPMENT
    // BSC: '56', //PRODUCTION
  },
};

export const ICON_END_POINT = "https://raw.githubusercontent.com/Yara1990/TokensIcons/main/cryptocurrency-icons-master/128/icon/";
export const COINGECKO_PRICE_END_POINT = "https://raw.githubusercontent.com/yfdaifinance/SafeSwapTokenList/main/coingeckourl1.json";
export const FORWARD_TOKEN_COINGECKO_PRICE_BSC = "https://api.coingecko.com/api/v3/simple/price?ids=yfdai-finance&vs_currencies=USD"; //PRODUCTION === forward(place it next to id where currently it is yfdai-finance)
export const FORWARD_TOKEN_CSV_NAME = "yfdai-finance"; //PRODUCTION CHANGE TO FORWARD (forward)
export const BSC_BLOCK_TIME = 2; //PRODUCTION CHANGE IT TO CORRECT TIME
