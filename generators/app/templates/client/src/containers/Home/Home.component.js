import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import styles from './style.css';

export default class Home extends Component {

  render() {
    return (
      <div>
        <p className={styles.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => browserHistory.push('/page')}>Click me!</button>
        <Link to='/page' >Or use a link!</Link>
      </div>
    );
  }
}
