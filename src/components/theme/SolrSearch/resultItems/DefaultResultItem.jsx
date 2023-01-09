import React from 'react';
import { Link } from 'react-router-dom';
import ResultItemDate from './helpers/ResultItemDate';
// import { FormattedMessage } from 'react-intl';

// const mapContentTypes = (contentType) =>
//  ({
//     // Some items have no translation and it's better to show them as "Folder" anyway
//     'Language Root Folder': 'Frontpage',
//     'Language Independent Folder': 'Folder',
//     }[contentType] || contentType);

const DefaultResultItem = ({ item }) => (
  <article className="tileItem">
    {/* <span className="contentTypeLabel">
      <FormattedMessage id={mapContentTypes(item['@type'])} />
    </span> */}
    <h2 className="tileHeadline">
      <Link to={item['@id']} className="summary url" title={item['@type']}>
        {item.title}
      </Link>
    </h2>
    <p className="url">{item['@id']}</p>
    {item?.highlighting && item.highlighting.length > 0 ? (
      <div className="tileBody">
        {(item?.effective || item?.extras?.start) && (
          <ResultItemDate
            date={item?.extras?.start ? item.extras.start : item?.effective}
            hasExcerpt={true}
          />
        )}
        <span
          className="description"
          dangerouslySetInnerHTML={{
            __html: item.highlighting,
          }}
        />
        {' ...'}
      </div>
    ) : (
      <div className="tileBody">
        {(item?.effective || item?.extras?.start) && (
          <ResultItemDate
            date={item?.extras?.start ? item.extras.start : item?.effective}
            hasExcerpt={item?.description}
          />
        )}
        <span className="description">
          {item.description
            ? item.description.length > 200
              ? item.description.slice(0, 199) + '...'
              : item.description
            : ''}
        </span>
      </div>
    )}
    <div className="visualClear" />
    {/* END CUSTOMIZATION */}
  </article>
);

export default DefaultResultItem;
