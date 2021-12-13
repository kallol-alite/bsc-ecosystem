import React from "react";
import { Card } from "reactstrap";

import styles from "./ComingSoonCard.module.css";
import TelegramIcon from '../../../assets/telegram.svg';
import TwitterIcon from '../../../assets/twitter.svg';
import FacebookIcon from '../../../assets/facebook.svg';
import InstagramIcon from '../../../assets/instagram.svg';
import YoutubeIcon from '../../../assets/youtube.svg';

const LINKS = [
  {
    icon: TelegramIcon,
    link: "https://t.me/forwardprotocolofficial"
  },
  {
    icon: TwitterIcon,
    link: "https://twitter.com/ForwardProtocol"
  },
  {
    icon: FacebookIcon,
    link: "https://facebook.com/ForwardProtocol"
  },
  {
    icon: InstagramIcon,
    link: "https://instagram.com/forwardprotocol"
  },
  {
    icon: YoutubeIcon,
    link: "https://www.youtube.com/forwardprotocol"
  },
  // {
  //   icon: DiscordIcon,
  //   link: "https://twitter.com/ForwardProtocol"
  // },
]

const ComingSoonCard = () => {
  return (
    <>
      <Card className={styles.comingSoonCard}>
        <div className={styles.comingSoonCardContent + " m-3"}>
          <h3>Coming Soon</h3>
          <div className={styles.infoValue}>Stay tuned for more details</div>
          <div className={styles.contactLinks}>
            {LINKS.map(item => <div><a href={item.link} target="_blank"><img className={styles.linkIcon} src={item.icon} alt=""/></a></div>)}
          </div>
        </div>
      </Card>
    </>
  );
};

export default ComingSoonCard;
