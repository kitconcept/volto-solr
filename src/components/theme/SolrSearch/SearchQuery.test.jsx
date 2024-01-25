import { queryStateFromParams, queryStateToParams } from './SearchQuery';

describe('SOLR SearchQuery', () => {
  describe('queryStateFromParams', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });
    afterEach(() => {
      // eslint-disable-next-line no-console
      console.warn.mockRestore();
    });
    it('works', () => {
      expect(
        queryStateFromParams({
          allow_local: 'true',
          facet_conditions: btoa('{"foo":{"m":true}}'),
          group_select: '2',
          local: 'true',
          SearchableText: 'foobar',
          sort_on: 'alphabetic',
        }),
      ).toEqual({
        allowLocal: true,
        facetConditions: { foo: { m: true } },
        groupSelect: 2,
        local: true,
        searchword: 'foobar',
        sortOn: 'alphabetic',
      });
    });
    it('initial', () => {
      expect(queryStateFromParams({})).toEqual({
        allowLocal: false,
        facetConditions: {},
        groupSelect: 0,
        local: false,
        searchword: '',
        sortOn: 'relevance',
      });
    });
  });
  describe('queryStateToParams', () => {
    it('works', () => {
      expect(
        queryStateToParams({
          allowLocal: true,
          facetConditions: { foo: { m: true } },
          groupSelect: 2,
          local: true,
          searchword: 'foobar',
          sortOn: 'alphabetic',
        }),
      ).toEqual({
        allow_local: 'true',
        facet_conditions: btoa('{"foo":{"m":true}}'),
        group_select: '2',
        local: 'true',
        SearchableText: 'foobar',
        sort_on: 'alphabetic',
      });
    });
    it('defaults ', () => {
      expect(
        queryStateToParams({
          allowLocal: false,
          facetConditions: {},
          groupSelect: 0,
          local: false,
          searchword: '',
          sortOn: 'relevance',
        }),
      ).toEqual({
        allow_local: 'false',
        facet_conditions: '',
        group_select: '0',
        local: 'false',
        SearchableText: '',
        sort_on: 'relevance',
      });
    });
    it('prunes condition tree', () => {
      expect(
        queryStateToParams({
          allowLocal: true,
          facetConditions: { foo: { p: 'prefix', m: false }, bar: {} },
          groupSelect: 2,
          local: true,
          searchword: 'foobar',
          sortOn: 'alphabetic',
        }),
      ).toEqual({
        allow_local: 'true',
        facet_conditions: btoa('{"foo":{"p":"prefix"}}'),
        group_select: '2',
        local: 'true',
        SearchableText: 'foobar',
        sort_on: 'alphabetic',
      });
    });
  });
});
