import { map, omit } from 'lodash';
import {
  SOLR_SEARCH_SUGGESTIONS,
  RESET_SOLR_SEARCH_SUGGESTIONS,
} from '../../actions/solrsearch/solrSearchSuggestions';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
  batching: {},
  subrequests: {},
};

export default function solrSearchSuggestions(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case `${SOLR_SEARCH_SUGGESTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        total: 0,
        loading: false,
        loaded: false,
        batching: {},
      };
    case `${SOLR_SEARCH_SUGGESTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result.suggestions,
        total: 0, // XXX TBD
        loading: false,
        loaded: false,
        batching: {},
      };
    case `${SOLR_SEARCH_SUGGESTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        total: 0,
        loading: false,
        loaded: false,
        batching: {},
      };
    case RESET_SOLR_SEARCH_SUGGESTIONS:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, [action.subrequest]),
          }
        : {
            ...state,
            error: null,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };

    default:
      return state;
  }
}
