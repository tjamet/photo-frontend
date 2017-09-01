const ADD_SEARCH_HITS = 'ADD_SEARCH_HITS';

var algoliasearch = require('algoliasearch/lite');
var client = algoliasearch("TDAMRV2O9W", "02fde40e77ff0c2404cce68756c092e1");
var index = client.initIndex('gallery');

export default function imageLoader(state = [], action = {}) {
    switch (action.type) {
        case ADD_SEARCH_HITS:
            for (var elt of action.hits) {
                var found = false;
                for (var oldElt of state) {
                    if (oldElt.objectID == elt.objectID) {
                        found = true
                    }
                }
                if (!found) {
                    state = state.concat([elt])
                }
            }
            return state;
        default:
            return state;
    }
}

export function loadNextImages(page = 0) {
    return function (dispatch) {
        index.search({ query: "", page: page },
            function searchDone(err, content) {
                if (err) {
                    console.error(err);
                    return;
                }
                dispatch(addHits(content.hits))
                if (content.page < content.nbPages) dispatch(loadNextImages(page + 1))
            }
        )
    }
}

export function addHits(hits) {
    return { type: ADD_SEARCH_HITS, hits };
}