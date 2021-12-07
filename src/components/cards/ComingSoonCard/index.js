import React from "react";
import { Card } from "reactstrap";

import styles from "./ComingSoonCard.module.css";
import DiscordIcon from '../../../assets/discord.svg';
import LinkedinIcon from '../../../assets/linkedin.svg';
import TelegramIcon from '../../../assets/telegram.svg';
import TwitterIcon from '../../../assets/twitter.svg';
import RedditIcon from '../../../assets/reddit.svg';

const LINKS = [
  {
    icon: DiscordIcon,
    link: "#"
  },
  {
    icon: LinkedinIcon,
    link: "#"
  },
  {
    icon: TelegramIcon,
    link: "#"
  },
  {
    icon: TwitterIcon,
    link: "#"
  },
  {
    icon: RedditIcon,
    link: "#"
  }
]

const ComingSoonCard = () => {
  return (
    <>
      <Card className={styles.comingSoonCard}>
        <div className={styles.comingSoonCardContent + " m-3"}>
          <h3>Coming Soon</h3>
          <div className={styles.infoValue}>Stay tuned for more details</div>
          <div className={styles.contactLinks}>
            {LINKS.map(item => <div><a href={item.link} target="_blank"><img src={item.icon} alt=""/></a></div>)}
          </div>
        </div>
      </Card>
    </>
  );
};

export default ComingSoonCard;
