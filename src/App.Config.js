//Change it according to bsc on production

export const VALID_APP_NETWORK = 56;
export const CURRENT_CHAIN_BLOCK_TIME = 3;

export const DEFAULT_NETWORK_ERROR = "Please switch to BSC network"

export const CONTRACT_ADDRESS = {
  TOKEN: {
    FORWARD: "",
  },
  FARMING: {
    CONTRACT: "0xc2463998c97368C5981dfe3eCcA0528dF458631A",
  },
  STAKING: {
    //----------PRODUCTION MAIN
    CONTRACT: "0x80ce940d5d36Bce5edCd1B9A2A4255Ea48D536d5",
    TOKEN: "0x886640149e31e1430fa74cc39725431eb82ddfb2",
    //----------PRODUCTION TEST
    // CONTRACT: "0x648C075Af273208e4aBf762F113599DC704E57d1",
    // TOKEN: "0xc2835CA14E497E0809e0533628A89a2EdBc0006B",
    //----------DEVLOPMENT
    // CONTRACT: "0x7367812ec673Ee32F446Ac52d914127fE8c857b6", 
    // TOKEN: "0xe91b6954607acb9aa3997ce00dc39cd03d33965d",
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
export const BUY_FORWARD_LINK = `https://pancakeswap.finance/swap?outputCurrency=${CONTRACT_ADDRESS.STAKING.TOKEN}`

export const IS_DEVICE_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
