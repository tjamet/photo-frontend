// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './style.scss';

import Gallery from '../../components/gallery';
import AlgoliaNotif from '../../components/algoliaNotif';

import logo from '../../../img/logo.png';

export default class Photos extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = { opened: false, current: 0 };
    }

    render() {
        return (
            <div className={styles.fullHeight}>
                <AlgoliaNotif/>
                <div className={styles.logoFrame}>
                    <span className={styles.logoHelper}></span>
                    <img src={logo} className={styles.logo} />
                </div>
                <span className={styles.galleryHelper} />
                <div className={styles.gallery}>
                    <Gallery />
                </div>
            </div>
        );
    }
}