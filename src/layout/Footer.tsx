import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import styles from './styles/App.module.css';

const Footer = () => (
  <div className={styles.footerWrap}>
    © 2021 <a href="https://github.com/tnfe/concent-pro" target="blank">Concent Pro</a>
    , powered by <a href="https://github.com/concentjs/concent" target="blank">Concent </a>
    <a href="https://github.com/concentjs/concent" target="blank">
      <GithubOutlined />
    </a>
  </div>
);

export default React.memo(Footer);
