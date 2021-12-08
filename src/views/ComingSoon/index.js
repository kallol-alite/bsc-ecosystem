import React from "react";

import styles from "./ComingSoon.module.css";

import ComingSoonCard from '../../components/cards/ComingSoonCard';

const ComingSoon = () => {
  return (
    <div className={styles.viewContainer}>
      <ComingSoonCard/>
    </div>
  );
};

export default ComingSoon;
