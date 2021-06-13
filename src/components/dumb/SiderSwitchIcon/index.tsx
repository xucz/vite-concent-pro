import React from 'react';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import './style.css';

interface IProps {
  style?: Record<string, any>;
  des?: 'left' | 'right';
  onClick?: (args?: any[]) => any;
}

const stDrawerIcon = { position: 'fixed', top: '48%', zIndex: '999999' };

function SiderSwitchIcon({ style = stDrawerIcon, des = 'left', onClick }: IProps) {
  // 因为icon做了旋转，导致这里需取反方向
  const uiIcon = des === 'left' ? <RightCircleOutlined /> : <LeftCircleOutlined />;
  return (
    <div className="ccpro-drawer__icon" style={style} onClick={() => onClick && onClick()}>
      <span>
        {uiIcon}
      </span>
    </div>
  );
}

export default SiderSwitchIcon;
