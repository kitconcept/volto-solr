import {
  decodeConditionTree,
  encodeConditionTree,
  pruneConditionTree,
} from './SearchConditions';
import { bToA, aToB } from './base64Helpers';

export const queryStateFromParams = (params) => ({
  searchword: params.SearchableText || '',
  sortOn: params.sort_on || 'relevance',
  groupSelect: parseInt(params.group_select) || 0,
  allowLocal: (params.allow_local || '').toLowerCase() === 'true',
  local: (params.local || '').toLowerCase() === 'true',
  facetConditions: decodeConditionTree(params.facet_conditions, {
    catchError: true,
  }),
});

export const queryStateToParams = (queryState) => ({
  SearchableText: queryState.searchword,
  sort_on: queryState.sortOn,
  group_select: '' + queryState.groupSelect,
  allow_local: '' + (queryState.allowLocal || false),
  local: '' + (queryState.local || false),
  facet_conditions: encodeConditionTree(
    pruneConditionTree(queryState.facetConditions),
  ),
});
