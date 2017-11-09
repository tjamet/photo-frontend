// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './style.scss';
import Lightbox from 'react-images';
import Mosaic from '../mosaic';

import {loadNextImages} from '../../redux/imageLoader';

function mapStateToProps(state) {
    return {
        images: state.imageLoader.images,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadNextImages }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        loadNextImages: PropTypes.func.isRequired,
        images: PropTypes.array.isRequired,
    }

    componentDidMount(){
        this.props.loadNextImages(0);
    }

    constructor(props) {
        super(props);
        this.state = { opened: false, current: 0 };
    }

    render() {
        // TODO: move this to global computation. No need to recompute it for each image change
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
