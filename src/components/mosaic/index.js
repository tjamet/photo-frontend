import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import Image from '../image';

export default class Mosaic extends Component {
    render() {
        return <div className={styles.mosaic}>
            {
                this.props.images.map((elt) => (
                    <Image key={elt.key} src={elt.thumbnail} />
                ))
            }
        </div>
    }
}