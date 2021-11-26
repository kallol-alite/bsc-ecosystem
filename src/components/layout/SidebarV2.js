import React from "react";
import { NavLink } from "react-router-dom";
import FarmingLogo from '../../assets/farming-logo.svg';
import StakingLogo from '../../assets/staking-logo.svg';
export default function sidebarV2() {
    const NAV_LINKS = [     
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
          path: "/Staking",
          isExternal: false,
          network: null,
        }      
      ];
  return (
    <div className="sidebar-main">
      <div className="nav-list">
        <ul>
          {NAV_LINKS.map((item) => {
            if (item) {
              return <NavLinkComponent linkConfig={item} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}
function NavLinkComponent({ linkConfig: { logo, path, isExternal, title, subtext } }) {
    return (
      <>
        
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
        
      </>
    );
  }