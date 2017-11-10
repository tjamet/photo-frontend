import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import theme from '../../theme';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { List, ListItem } from 'material-ui/List';

import MenuItem from 'material-ui/MenuItem';


import { loadNextImages, search, addFilteredKeyword, rmFilteredKeyword } from '../../redux/imageLoader';

function mapStateToProps(state) {
    return {
        keywords: state.imageLoader.keywords,
        search_query: state.imageLoader.search_query,
        filtered_keywords: state.imageLoader.filtered_keywords,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadNextImages, search, addFilteredKeyword, rmFilteredKeyword }, dispatch);
}

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        margin: '5%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    hidden: {
        display: 'none',
    },
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ImageFilter extends Component {
    static propTypes = {
        loadNextImages: PropTypes.func.isRequired,
        search: PropTypes.func.isRequired,
        addFilteredKeyword: PropTypes.func.isRequired,
        rmFilteredKeyword: PropTypes.func.isRequired,
        keywords: PropTypes.object.isRequired,
        search_query: PropTypes.string.isRequired,
        filtered_keywords: PropTypes.array.isRequired,
    }

    componentWillReceiveProps(props) {
        if (props.search_query != this.props.search_query || props.filtered_keywords != this.props.filtered_keywords) {
            props.loadNextImages(0, props.search_query, props.filtered_keywords)
        }
    }

    render() {
        var sortable = [];
        for (var vehicle in this.props.keywords) {
            sortable.push([vehicle, this.props.keywords[vehicle]]);
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        var displayedFields = [
            "shooting",
            "spain",
            "barcelona",
            "france",
            "paris",
            "dj",
            "studio",
            "mode",
            "sports",
            "portrait",
        ]

        sortable = sortable.filter((elt) => !this.props.filtered_keywords.includes(elt[0]))
        sortable = sortable.filter((e)=>displayedFields.includes(e[0].toLowerCase()))

        return <div>
            <div style={styles.wrapper}>
                {
                    this.props.filtered_keywords.map((elt, idx) => {
                        return <Chip
                            onRequestDelete={() => this.props.rmFilteredKeyword(elt)}
                            onClick={() => this.props.rmFilteredKeyword(elt)}
                            key={idx}
                        >
                            {elt}
                        </Chip>
                    })
                }
            </div>
            <div style={styles.hidden}>
                <TextField
                    hintText="Rechercher des photos"
                    value={this.props.search_query}
                    onChange={(event, newValue) => {
                        this.props.search(newValue)
                    }}
                />
            </div>
            <List>
                {
                    sortable.map((elt, idx) => (
                        <ListItem
                            key={idx}
                            primaryText={elt[0]}
                            rightIconButton={
                                <FloatingActionButton mini={true} disabled={true}>
                                    {elt[1]}
                                </FloatingActionButton>
                            }
                            onClick={(event) => this.props.addFilteredKeyword(elt[0])}
                        />


                    ))
                }
            </List>
        </div>
    }
}