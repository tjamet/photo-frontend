const ADD_SEARCH_HITS = 'ADD_SEARCH_HITS';
const CLEAR_SEARCH_HITS = 'CLEAR_SEARCH_HITS';
const STORE_FACETS_SEARCH_HITS = 'CLEAR_SEARCH_HITS';

var algoliasearch = require('algoliasearch/lite');
var client = algoliasearch("TDAMRV2O9W", "02fde40e77ff0c2404cce68756c092e1");
var index = client.initIndex('gallery');

export default function imageLoader(state = {images:[]}, action = {}) {
    switch (action.type) {
        case ADD_SEARCH_HITS:
            for (var elt of action.hits) {
                var found = false;
                for (var oldElt of state.images) {
                    if (oldElt.objectID == elt.objectID) {
                        found = true
                    }
                }
                if (!found) {
                    state.images = state.images.concat([elt])
                }
            }
            return Object.assign({}, state, {images: state.images});

        case CLEAR_SEARCH_HITS:
            return Object.assign({}, state, {images: []})

        case STORE_FACETS_SEARCH_HITS:
            return Object.assign({}, state, {keywords: action.keywords})
        default:
            return state;
    }
}

export function loadNextImages(page = 0, query="") {
    return function (dispatch) {
        if (page == 0) {
            dispatch(clearImages());
        }
        index.search({ query: query, page: page, hitsPerPage: 200, facets: '["Keywords"]' },
            function searchDone(err, content) {
                if (err) {
                    console.error(err);
                    return;
                }
                dispatch(addHits(content.hits))
                dispatch(storeFacets(facets))
                if (content.page <= content.nbPages) dispatch(loadNextImages(page + 1))
            }
        )
    }
}

export function addHits(hits) {
    return { type: ADD_SEARCH_HITS, hits };
}

export function clearImages() {
    return { type: CLEAR_SEARCH_HITS }
}

export function storeFacets(keywords) {
    return { type: STORE_FACETS_SEARCH_HITS, keywords }
}