
import React from 'react';
import { useC2DefaultMod } from 'services/concent';
import Header from './components/Header';
import QuickNavBar from './components/QuickNavBar';
import SettingIcon from './components/SettingIcon';

function TopContent() {
  const { globalComputed: gcu } = useC2DefaultMod();
  return (
    <React.Fragment>
      {gcu.isHeaderAboveNavBar ? <Header /> : <QuickNavBar />}
      {!gcu.isHeaderAboveNavBar ? <Header /> : <QuickNavBar />}
      <SettingIcon />
    </React.Fragment>
  );
}

export default React.memo(TopContent);
