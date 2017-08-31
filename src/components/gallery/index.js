// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './style.scss';
import Lightbox from 'react-images';
import Mosaic from '../mosaic';

export default class App extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = { opened: false, current: 0 };
    }

    render() {
        var imgs = this.props.images.map((elt) => (
            { src: elt.sizes.large, thumbnail: elt.sizes.medium, key: elt.objectID }
        ))
        var imgCount = imgs.length
        return (
            <div className={styles.centered}>
                <div className={styles.centeredContent}>
                    <Mosaic images={imgs} onClick={(idx) => this.setState({ opened: true, current: idx })} />
                </div>
                <Lightbox
                    isOpen={this.state.opened}
                    images={imgs}
                    showThumbnails={true}
                    onClose={() => this.setState({ opened: false })}
                    currentImage={this.state.current}
                    backdropClosesModal={true}
                    onClickNext={() => this.setState({ current: (this.state.current + 1) % imgCount })}
                    onClickPrev={() => this.setState({ current: (imgCount + this.state.current - 1) % imgCount })}
                    onClickThumbnail={(idx) => this.setState({ current: idx })}
                />
            </div>
        );
    }
}
