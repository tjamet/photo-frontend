import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import Image from '../image';

export default class Mosaic extends Component {

    static propTypes = {
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        onClick: PropTypes.func,
    }

    render() {
        return <div className={styles.mosaic}>
            {
                this.props.images.map((elt, idx) => (
                    <a href="#" key={elt.key}>
                        <Image
                            src={elt.thumbnail}
                            onClick={(event) => { event.preventDefault(); if (this.props.onClick) this.props.onClick(idx) }}
                        />
                    </a>
                ))
            }
        </div>
    }
}