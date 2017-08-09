import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './style.css';

export default class Page extends Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.container}>
        <Link to='/'>Back</Link>
      </div>
    );
  }
}
