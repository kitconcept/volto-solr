import { Icon } from '@plone/volto/components';
import downSVG from './icons/down-key-nofill.svg';
import upSVG from './icons/up-key-nofill.svg';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  search: {
    id: 'Search...',
    defaultMessage: 'Search...',
  },
});

export const SearchConditionsFieldSearch = ({ value, setValue }) => {
  const intl = useIntl();
  const onChange = (evt) => setValue?.(evt.target.value);
  return (
    <div class="ui icon input searchConditionsFieldSearch">
      <i class="search icon"></i>
      <input
        type="text"
        placeholder={intl.formatMessage(messages.search)}
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
};
