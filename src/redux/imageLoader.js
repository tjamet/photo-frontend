const ADD_SEARCH_HITS = 'ADD_SEARCH_HITS';
const CLEAR_SEARCH_HITS = 'CLEAR_SEARCH_HITS';
const STORE_FACETS_SEARCH_HITS = 'STORE_FACETS_SEARCH_HITS';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const ADD_FILTERED_KEYWORD = 'ADD_FILTERED_KEYWORD';
const RM_FILTERED_KEYWORD = 'RM_FILTERED_KEYWORD';

var algoliasearch = require('algoliasearch/lite');
var client = algoliasearch("TDAMRV2O9W", "02fde40e77ff0c2404cce68756c092e1");
var index = client.initIndex('gallery');

function merge(l1, l2, compare=null) {
    if (compare==null) {
        compare = (a,b)=>{return a==b}
    }
    for (var elt of l2) {
        var found = false;
        for (var oldElt of l1) {
            if (compare(oldElt, elt)) {
                found = true
            }
        }
        if (!found) {
            l1 = l1.concat([elt])
        }
    }
    return l1
}

function rm(l, elt) {
    var r = []
    for (var oldElt of l) {
        if (oldElt != elt) {
            r = r.concat([oldElt])
        }
    }
    return r
}

export default function imageLoader(state = { images: [], keywords: {}, search_query: "", filtered_keywords: [] }, action = {}) {
    switch (action.type) {
        case ADD_SEARCH_HITS:
            return Object.assign({}, state, { images: merge(state.images, action.hits, (a,b)=>{return a.objectID==b.objectID}) });

        case CLEAR_SEARCH_HITS:
            return Object.assign({}, state, { images: [] })

        case STORE_FACETS_SEARCH_HITS:
            return Object.assign({}, state, { keywords: action.keywords })

        case SET_SEARCH_QUERY:
            return Object.assign({}, state, { search_query: action.query })

        case ADD_FILTERED_KEYWORD:
            return Object.assign({}, state, { filtered_keywords: merge(state.filtered_keywords, [action.keyword]) })

        case RM_FILTERED_KEYWORD:
            return Object.assign({}, state, { filtered_keywords: rm(state.filtered_keywords, action.keyword) })

        default:
            return state;
    }
}

export function loadNextImages(page = 0, query = "", keywords = []) {
    return function (dispatch) {
        if (page == 0) {
            dispatch(clearImages());
        }
        dispatch(setSearchedString(query))
        query = query + keywords.map((e)=>'"'+e+'"').reduce((r,n)=>r+" "+n, "")
        index.search({ query: query, page: page, hitsPerPage: 200, facets: '["Keywords"]' },
            function searchDone(err, content) {
                if (err) {
                    console.error(err);
                    return;
                }
                dispatch(addHits(content.hits))
                dispatch(storeFacets(content.facets.Keywords))
                if (content.page < content.nbPages) loadNextImages(page + 1)
            }
        )
    }
}

export function search(query = "") {
    return loadNextImages(0, query)
}

export function addFilteredKeyword(keyword){
    return function (dispatch) {
        dispatch(addKeyword(keyword))
    }
}

export function rmFilteredKeyword(keyword){
    return function (dispatch) {
        dispatch(rmKeyword(keyword))
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

export function setSearchedString(query) {
    return { type: SET_SEARCH_QUERY, query }
}

export function addKeyword(keyword) {
    return { type: ADD_FILTERED_KEYWORD, keyword }
}

export function rmKeyword(keyword) {
    return { type: RM_FILTERED_KEYWORD, keyword }
}