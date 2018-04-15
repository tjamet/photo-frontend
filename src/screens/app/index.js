// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';

import styles from './style.scss';

import Background from '../../components/background';

import favicon from './favicon.png';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <div className={styles.fullScreen}>
        <Helmet
          link={[{
            rel: 'icon', href: favicon,
          }]}
        />
        <Background />
        { this.props.children }
      </div>
    );
  }
}
