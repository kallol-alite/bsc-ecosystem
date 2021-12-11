//Change it according to bsc on production

export const VALID_APP_NETWORK = 137;
export const CURRENT_CHAIN_BLOCK_TIME = 3;

export const CONTRACT_ADDRESS = {
  TOKEN: {
    FORWARD: "",
  },
  FARMING: {
    CONTRACT: "0xc2463998c97368C5981dfe3eCcA0528dF458631A",
  },
  STAKING: {
    CONTRACT: "0x7367812ec673Ee32F446Ac52d914127fE8c857b6", //"0x7ae8C55FCC5Fc808d381701179992e1D1C1c2Dc0", //DEVLOPMENT
    TOKEN: "0xe91b6954607acb9aa3997ce00dc39cd03d33965d",
  },
};

export const ALLOWED_NETWORKS = {
  FARMING: VALID_APP_NETWORK,
  STAKING: VALID_APP_NETWORK,
};

export const ICON_END_POINT = "https://raw.githubusercontent.com/Yara1990/TokensIcons/main/cryptocurrency-icons-master/128/icon/";
export const COINGECKO_PRICE_END_POINT = "https://raw.githubusercontent.com/yfdaifinance/SafeSwapTokenList/main/coingeckourl1.json";

//PRODUCTION === forward (place it next to id where currently it is yfdai-finance), check coingecko listing
export const FORWARD_TOKEN_COINGECKO_PRICE = "https://api.coingecko.com/api/v3/simple/price?ids=yfdai-finance&vs_currencies=USD"; 
export const FORWARD_TOKEN_CSV_NAME = "yfdai-finance"; //PRODUCTION === forward

export const IS_DEVICE_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
