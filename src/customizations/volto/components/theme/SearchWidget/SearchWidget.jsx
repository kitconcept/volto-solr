import config from '@plone/volto/registry';

const SearchWidget = (props) => {
  console.log('rendering SearchWidget...', props);
  const { SolrSearchWidget } = config.widgets;
  return <SolrSearchWidget {...props} />;
};

export default SearchWidget;
