import { ChainId, SupportedChainIds } from "./utils/chainId";
import { RPC } from './utils/rpc';
import { InjectedConnector } from '@web3-react/injected-connector'
import Metamask from '../../assets/metamask.png';
import Injected from '../../assets/injected.svg';
import WalletConnect from '../../assets/wallet-connect.svg';
import Fortmatic from '../../assets/fortmatic.png';
import Portis from  '../../assets/portis.png';
import Torus from '../../assets/torus.png';
import Bsc from '../../assets/bsc.jpg';
import WalletLink from '../../assets/coinbase.svg';

export const injected = new InjectedConnector({
    SupportedChainIds,
})

//configs required connector, rest is optional and in current app is unused
//currently using connector and name only

export const SUPPORTED_WALLETS = {
    /* INJECTED: {
        connector: injected,
        name: 'Injected',
        iconName: Injected,
        description: 'Injected web3 provider.',
        href: null,
        color: '#010101',
        primary: true,
    }, */
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconName: Metamask,
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D',
    },
    WALLET_CONNECT: {
        connector: async () => {
            const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
            return new WalletConnectConnector({
                rpc: { 56: "https://bsc-dataseed1.ninicoin.io" },
                bridge: 'https://bridge.walletconnect.org',
                qrcode: true,
               // supportedChainIds: SupportedChainIds,
            })
        },
        name: 'WalletConnect',
        iconName: WalletConnect,
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: null,
        color: '#4196FC',
        mobile: true,
    },
    /* WALLET_LINK: {
        connector: async () => {
            const WalletLinkConnector = (await import('@web3-react/walletlink-connector')).WalletLinkConnector
            return new WalletLinkConnector({
                url: RPC[ChainId.RINKEBY],
                appName: 'Test Wallet',
                appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
            })
        },
        name: 'Coinbase Wallet',
        iconName: WalletLink,
        description: 'Use Coinbase Wallet app on mobile device',
        href: null,
        color: '#315CF5',
    }, */
    FORTMATIC: {
        connector: async () => {
          const FortmaticConnector = (await import('@web3-react/fortmatic-connector')).FortmaticConnector
          return new FortmaticConnector({
            apiKey: 'pk_live_4A3165DABC726E55',
            chainId: [137],
          })
        },
        name: 'Fortmatic',
        iconName: Fortmatic,
        description: 'Login using Fortmatic hosted wallet',
        href: null,
        color: '#6748FF',
        mobile: true,
      },
      Portis: {
        connector: async () => {
          const PortisConnector = (await import('@web3-react/portis-connector')).PortisConnector
          return new PortisConnector({
            dAppId: '4b9ee1cc-3e75-4a29-8593-4b7e36659bf3',
            networks: [56],
          })
        },
        name: 'Portis',
        iconName: Portis,
        description: 'Login using Portis hosted wallet',
        href: null,
        color: '#4A6C9B',
        mobile: true,
      },
      Torus: {
        connector: async () => {
          const TorusConnector = (await import('@web3-react/torus-connector')).TorusConnector
          return new TorusConnector({
            chainId: [56],
          })
        },
        name: 'Torus',
        iconName: Torus,
        description: 'Login using Torus hosted wallet',
        href: null,
        color: '#315CF5',
        mobile: true,
      },
      Binance: {
        connector: async () => {
          const BscConnector = (await import('@binance-chain/bsc-connector')).BscConnector
          return new BscConnector({
            supportedChainIds: [56],
          })
        },
        name: 'Binance',
        iconName: Bsc,
        description: 'Login using Binance hosted wallet',
        href: null,
        color: '#F0B90B',
        mobile: true,
      },
}