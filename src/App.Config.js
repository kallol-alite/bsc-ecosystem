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
  STAKING: {
    BSC: "0x9372a522400d9443d62E2E7961a2646Ec7B77C85", //DEVLOPMENT
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
  TEST_FORWARD: "safeswap", ////this is ONLY FOR TEST
};

export const BSC_TEST_BLOCKTIME = 3; //FOR TEST ONLY
