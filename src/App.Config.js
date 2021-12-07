export const CONTRACT_ADDRESS = {
  TOKEN: {
    FORWARD: "", //DEVELOPMENT,
    // FORWARD: '', //PRODUCTION,
  },
  FARMING: {
    BSC: "0xc2463998c97368C5981dfe3eCcA0528dF458631A", //DEVELOPMENT: ON POLYGON
    TOKEN: "0x2dA7daE64D1cf0122096aA52A67C4bCA363Cc372", //DEVELOPMENT: ON POLYGON
    // BSC: '', //PRODUCTION
  },
  STAKING: {
    BSC: "0x7ae8C55FCC5Fc808d381701179992e1D1C1c2Dc0", //DEVLOPMENT
    TOKEN: "0x0c298c380cdce88a017d4fa22af267878a3714e1", //DEVLOPMENT
  },
};

export const ALLOWED_NETWORKS = {
  FARMING: {
    BSC: 137, //DEVELOPMENT
    // BSC: '56', //PRODUCTION
  },
  STAKING: {
    BSC: 137, //DEVLOPMENR
  },
};

export const API_COINGECO = {
  TEST: "https://api.coingecko.com/api/v3/simple/price?ids=safeswap&vs_currencies=USD", //FOR DEVLOPMENT PERPOSE ONLY
};

export const CSV = {
  TEST_FORWARD: "safeswap", //this is ONLY FOR TEST
};

export const ICON_END_POINT = "https://raw.githubusercontent.com/Yara1990/TokensIcons/main/cryptocurrency-icons-master/128/icon/";
export const COINGECKO_PRICE_END_POINT = "https://raw.githubusercontent.com/yfdaifinance/SafeSwapTokenList/main/coingeckourl1.json";
export const FORWARD_TOKEN_COINGECKO_PRICE_BSC = "https://api.coingecko.com/api/v3/simple/price?ids=yfdai-finance&vs_currencies=USD"; //PRODUCTION === forward(place it next to id where currently it is yfdai-finance)
export const FORWARD_TOKEN_CSV_NAME = "yfdai-finance"; //PRODUCTION CHANGE TO FORWARD (forward)
export const BSC_BLOCK_TIME = 3; //PRODUCTION CHANGE IT TO CORRECT TIME

export const IS_DEVICE_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
