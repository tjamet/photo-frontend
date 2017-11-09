// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './style.scss';

import theme from '../../theme';

import Gallery from '../../components/gallery';
import FilterSidebar from '../../components/filterSidebar';
import AlgoliaNotif from '../../components/algoliaNotif';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import AppBar from 'material-ui/AppBar';

import ImageFilter from '../../components/imageFilter';

import logo from '../../../img/logo.png';

const styl = {
    hidden: {
        display: 'none',
    },
    nohelper: {
        height: '340px',
    }
};

function mapStateToProps(state) {
    return {
        filtered_keywords: state.imageLoader.filtered_keywords,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Photos extends Component {
    static propTypes = {
        filtered_keywords: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = { opened: false, current: 0 };
    }

    render() {
        var logoStyle = {}
        var helperStyle = {}
        if (this.props.filtered_keywords.length>0) {
            logoStyle = styl.hidden
            helperStyle = styl.nohelper
        }
        return (
            <div className={styles.fullHeight}>
                <AlgoliaNotif />
                <MuiThemeProvider muiTheme={theme}>
                    <AppBar
                    iconElementLeft={<div/>}
                    >
                        <IconMenu
                            iconButtonElement={<IconButton><ContentFilter /></IconButton>}
                            onChange={this.handleChangeMultiple}
                            value={this.state.valueMultiple}
                            multiple={true}
                        >
                            <ImageFilter/>
                        </IconMenu>
                    </AppBar>
                </MuiThemeProvider>
                <div className={styles.logoFrame}  style={logoStyle}>
                    <span className={styles.logoHelper}></span>
                    <img src={logo} className={styles.logo} />
                </div>
                <span className={styles.galleryHelper} style={helperStyle} />
                <div className={styles.gallery}>
                    <Gallery />
                </div>
            </div>
        );
    }
}