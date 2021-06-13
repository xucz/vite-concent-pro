import React from 'react';
import { useC2DefaultMod } from 'services/concent';
import styles from '../styles/App.module.css';

function Logo() {
  const { globalComputed: { logoCtrl } } = useC2DefaultMod();
  const style: React.CSSProperties = { backgroundImage: `url(${logoCtrl.imgUrl})`, width: logoCtrl.width };

  if (logoCtrl.showLabel) {
    return <div className={styles.logoLabelWrap} style={{ color: logoCtrl.color }}>
      {logoCtrl.label}
    </div>;
  }

  return <div style={style} className={styles.logoWrap} />;
}

export default React.memo(Logo);
