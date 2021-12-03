import { ChainId } from "./chainId";

export const RPC = {
  // [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  // [ChainId.RINKEBY]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today/',
  [ChainId.BSC]: 'https://bsc-dataseed1.ninicoin.io',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
}