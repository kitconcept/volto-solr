import {
  solrSearchContent,
  copyContentForSolr,
} from '@kitconcept/volto-solr/actions';
import {
  SolrSearch,
  SolrFormattedDate,
  SolrSearchWidget,
  SolrSearchAutosuggest,
} from '@kitconcept/volto-solr/components';
import * as searchResultItems from '@kitconcept/volto-solr/components/theme/SolrSearch/resultItems';
import fileSVG from '@plone/volto/icons/file.svg';
import reducers from './reducers';
import routes from './routes';
import './theme/solrsearch.less';

const applyConfig = (config) => {
  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    /\/@@search$/,
  ];

  // --
  // View type mapping for the search results in support of Search.jsx
  // --

  // View mapper can be specified here. with the desired type rendererers.
  // The default view applies for all content types not in the array.
  // Or just use the built in mapper.
  config.views.contentTypeSearchResultViews = {
    Event: searchResultItems.EventResultItem,
    Image: searchResultItems.ImageResultItem,
    'News Item': searchResultItems.NewsItemResultItem,
    Person: searchResultItems.PersonResultItem,
  };
  config.views.contentTypeSearchResultDefaultView =
    searchResultItems.DefaultResultItem;

  // The search results use the Volto Image component, unless it's not
  // available, for example in Volto < 17. This flag, if set to true,
  // forces the use of the legacy component in all cases.
  config.settings.contentTypeSearchResultAlwaysUseLegacyImage = false;

  // Icon types. This will be in effect with all supported
  // content type templates. By default the content icons settings are
  // used, but this can be overridden.
  config.settings.contentTypeSearchResultIcons = {
    ...config.settings.contentIcons,
  };
  config.settings.contentTypeSearchResultDefaultIcon = fileSVG;

  // Options for solr search which can be customized
  config.settings.solrSearchOptions = config.settings.solrSearchDefaultOptions = {
    searchAction: solrSearchContent,
    getSearchReducer: (state) => state.solrsearch,
    copyContentForSolrAction: copyContentForSolr,
    contentTypeSearchResultViews: config.views.contentTypeSearchResultViews,
    contentTypeSearchResultDefaultView:
      config.views.contentTypeSearchResultDefaultView,
    showSearchInput: true,
    doEmptySearch: false,
  };

  // Wrapper for a customized Solr Search component that can be used
  // directly as a route.
  config.widgets.SolrSearch = SolrSearch;
  config.widgets.SolrFormattedDate = SolrFormattedDate;

  // Autocomplete widget
  config.widgets.SolrSearchWidget = SolrSearchWidget;
  config.widgets.SolrSearchAutosuggest = SolrSearchAutosuggest;

  config.addonReducers = { ...config.addonReducers, ...reducers };
  config.addonRoutes = [...config.addonRoutes, ...routes(config)];

  config.settings.baseColor = '#f0f0f0'; // needed as svg cannot use css

  return config;
};

export default applyConfig;
