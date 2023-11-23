import { useEffect } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  customSelectStyles,
  selectTheme,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { DropdownIndicator } from './DropdownIndicator';
import { Toolbar, Icon } from '@plone/volto/components';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import gridSVG from './icons/grid.svg';

const messages = defineMessages({
  layoutLabel: {
    // DE: Darstellung:
    id: 'Layout:',
    defaultMessage: 'Layout:',
  },
});

const filterSupportedLayouts = (layouts) => {
  const supportedLayouts = (layouts?.length > 0
    ? layouts
    : ['list']
  ).filter((layout) => ['list', 'grid'].includes(layout));
  if (layouts && supportedLayouts.length !== layouts.length) {
    console.warn(
      `Unsupported layouts are ignored from list: ${JSON.stringify(layouts)}`,
    );
  }
  return supportedLayouts;
};

export const SelectLayout = ({ onChange, value, layouts }) => {
  const intl = useIntl();
  const activeClass = (name) => (value === name ? 'active' : 'inactive');

  const supportedLayouts = filterSupportedLayouts(layouts);

  useEffect(() => {
    if (!supportedLayouts.includes(value)) {
      // If selected layout is not allowed: select the default
      onChange(supportedLayouts[0]);
    }
  }, [supportedLayouts, value]);

  return supportedLayouts.length >= 2 ? (
    <span className="layout-field">
      <span className="layout-label">
        {intl.formatMessage(messages.layoutLabel)}
      </span>
      <span
        className={`layout-selector ${activeClass('list')}`}
        onClick={() => onChange('list')}
      >
        <Icon name={listBulletSVG} size="18px" />
      </span>
      <span
        className={`layout-selector ${activeClass('grid')}`}
        onClick={() => onChange('grid')}
      >
        <Icon name={gridSVG} size="18px" color="red" />
      </span>
    </span>
  ) : null;
};
