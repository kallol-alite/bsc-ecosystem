import React from 'react';

const TokenIcon = ({image}) => {
  return(
    <>
      <div className="token-wrapper">
        <img className="icon" src={image} alt="" />
      </div>
    </>
  )
}

export default TokenIcon;