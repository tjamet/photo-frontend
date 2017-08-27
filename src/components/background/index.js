// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component, Image } from 'react';
import styles from './style.scss';

export default class Background extends Component {
  render() {
    return (
      <div className={styles.background} style={{backgroundImage: "url(http://thib-o.imgix.net/6D249D777C64390852FA9E69141A4D40?fit=max&fm=jpg&h=3000&q=95&w=3000&s=af618a288c01b0efee1eedc765d90773)"}}/>
    );
  }
}
