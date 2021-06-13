
import './styles/index.css';
import './styles/antd.css';
import 'configs/runConcent';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'layout';
import * as serviceWorker from './serviceWorker';

function getHostNode(id = 'root') {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement('div');
    node.id = id;
    document.body.appendChild(node);
  }
  return node;
}

ReactDOM.render(<App />, getHostNode('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
