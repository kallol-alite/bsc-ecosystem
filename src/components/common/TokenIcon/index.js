import React from 'react';

import styles from './TokenIcon.module.css';

const TokenIcon = ({image}) => {
  return(
    <>
      <div className={styles.tokenWrapper}>
        <img className={styles.icon} src={image} alt="" />
      </div>
    </>
  )
}

export default TokenIcon;