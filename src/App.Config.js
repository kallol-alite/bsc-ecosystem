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
    BSC: "0x8a64Be6A36555ECEa59eD1D086824AEce94785e5", //DEVLOPMENT
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

export const IS_DEVICE_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);