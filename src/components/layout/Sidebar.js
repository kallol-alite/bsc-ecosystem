import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEthers } from "@usedapp/core";

// import { setSidebarOpen } from "../../actions/master-actions";
// import { YFDAI_ADMINS } from "../../App.config";

import Logo from "../../assets/YfdaiLogo.svg";
import Telegram from "../../assets/telegram.svg";
import Other from "../../assets/other.svg";
import Linkedin from "../../assets/linkedin.svg";
import Twitter from "../../assets/twitter.svg";
import Link from "../../assets/link.svg";
import Discord from "../../assets/discord.svg";
import Reddit from "../../assets/reddit.svg";
import SafeswapLogo from "../../assets/safeswap-logo.svg";
import LaunchpadLogo from "../../assets/launchpad-logo.svg";
import SafetradeLogo from "../../assets/safetrade-logo.svg";
import FarmingLogo from "../../assets/farming-logo.svg";
import StakingLogo from "../../assets/staking-logo.svg";
import SSGTLogo from "../../assets/SsgtStakeLogo.svg";
import SSGTXLogo from "../../assets/ssgtx-sidebar-icon.svg";
import AdminLogo from "../../assets/airdrop-dark-icon.png";
import ExternalLink from "../../assets/external-link-icon.svg";
import YfdaiLogo from "../../assets/YfdaiStakeLogo.svg";

const Sidebar = () => {
  const { account } = useEthers();
  // const dispatch = useDispatch();
  // const isConnected = useSelector((state) => state.connectionReducer);
  // const { sidebarOpen } = useSelector((state) => state.masterReducer);

  // const isAdmin = () => {
  //   return isConnected && account && YFDAI_ADMINS.includes(account.toLowerCase());
  // };

  const NAV_LINKS = [
    {
      logo: SSGTXLogo,
      title: "Swap SSGTx",
      subtext: "Swap SSGT to SSGTx",
      path: "/swap",
      isExternal: false,
      network: null,
    },
    {
      logo: LaunchpadLogo,
      title: "Launchpad",
      subtext: "Token incubator service",
      path: "/launchpad",
      isExternal: false,
      network: null,
    },
    {
      logo: SafetradeLogo,
      title: "SafeTrade",
      subtext: "Automated trading bot",
      path: "/safetrade",
      isExternal: false,
      network: null,
    },
    {
      logo: SafeswapLogo,
      title: "SafeSwap Polygon",
      subtext: "Decentralized Exchange (DEX)",
      path: "https://safeswap-matic.yfdai.finance/",
      isExternal: true,
      network: "Polygon",
    },
    {
      logo: SafeswapLogo,
      title: "SafeSwap Ethereum",
      subtext: "Decentralized Exchange (DEX)",
      path: "https://safeswap.yfdai.finance/",
      isExternal: true,
      network: "Ethereum",
    },
    {
      logo: FarmingLogo,
      title: "Farming",
      subtext: "Farming yield while providing liquidity",
      path: "/farming",
      isExternal: false,
      network: null,
    },
    {
      logo: StakingLogo,
      title: "Staking",
      subtext: "Earn fixed interest on staking",
      path: "/staking",
      isExternal: false,
      network: null,
    },
    {
      logo: YfdaiLogo,
      title: "Lottery",
      subtext: "Take part in YFDAI Lottery",
      path: "/lottery",
      isExternal: false,
      network: null,
    },
    {
      logo: SSGTLogo,
      title: "Governance (SSGT)",
      subtext: "Vote on proposals",
      path: "https://snapshot.org/#/yfdaifinance.eth",
      isExternal: true,
      network: null,
    },
     {
      logo: AdminLogo,
      title: "Admin",
      subtext: "",
      path: "/admin",
      isExternal: false,
      network: null,
    },
  ];

  return (
    <div className={`sidebar-main`}>
      <div className='logo'>
        <a href='https://dashboard.yfdai.finance/'>
          <img src={Logo} alt='YFDAI' />
        </a>
        <p style={{ cursor: "pointer" }} /* onClick={() => dispatch(setSidebarOpen(!sidebarOpen))} */>
          x
        </p>
      </div>
      <div className='nav-list'>
        <ul>
          {/* {NAV_LINKS.map((item) => {
            if (item) {
              return <NavLinkComponent linkConfig={item} />;
            }
          })} */}
        </ul>
      </div>
      <div className='footerLinks'>
        <a href='https://t.me/yfdaifinance' target='_blank'>
          <img src={Telegram} alt='' />
        </a>
        <a href='https://medium.com/@yfdaifinance' target='_blank'>
          <img src={Other} alt='' />
        </a>
        <a href='https://linkedin.com/company/yfdai-finance' target='_blank'>
          <img src={Linkedin} alt='' />
        </a>
        <a href='https://twitter.com/YfdaiF' target='_blank'>
          <img src={Twitter} alt='' />
        </a>
        <a href='https://bitcointalk.org/index.php?topic=5295276.new#new' target='_blank'>
          <img src={Link} alt='' />
        </a>
        <a href='https://discord.gg/S3GRXRC' target='_blank'>
          <img src={Discord} alt='' />
        </a>
        <a href='https://www.reddit.com/r/YFDAI/' target='_blank'>
          <img src={Reddit} alt='' />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

function NavLinkComponent({ linkConfig: { logo, path, isExternal, title, subtext } }) {
  return (
    <>
      {isExternal ? (
        <a target='_blank' href={path} className='nav-link' activeClassName='active-nav-link'>
          <div className='link-box'>
            <div>
              <img src={logo} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>{title}</div>
              <div className='subtext'>{subtext}</div>
            </div>
            <div>
              <img src={ExternalLink} className='external-link-icon' />
            </div>
          </div>
        </a>
      ) : (
        <NavLink exact to={path} className='nav-link' activeClassName='active-nav-link'>
          <div className='link-box'>
            <div>
              <img src={logo} />
            </div>
            <div>
              <div>{title}</div>
              <div className='subtext'>{subtext}</div>
            </div>
          </div>
        </NavLink>
      )}
    </>
  );
}
