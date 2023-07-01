import React from 'react';
import { Link } from 'react-router-dom';
import ResultItemDate from './helpers/ResultItemDate';
import { Icon } from '@plone/volto/components';
import newsSVG from '@plone/volto/icons/news.svg';
import ConcatChildren from './helpers/ConcatChildren';
import ImageType, { getImageType } from './helpers/ImageType';

const NewsItemResultItem = ({ item }) => {
  const previewScale =
    item.image_scales[item.image_field]?.[0]?.scales?.preview;

  return (
    <article className="tileItem">
      {/* <span className="contentTypeLabel">
        <FormattedMessage id={mapContentTypes(item['@type'])} />
      </span> */}
      {previewScale && (
        <Link to={item['@id']}>
          <img
            className="previewImage"
            src={`${item['@id']}/${previewScale.download}`}
            alt={item.title}
            width={previewScale.width}
            height={previewScale.height}
          />
        </Link>
      )}
      <p className="url">{item['@id']}</p>
      <h2 className="tileHeadline">
        <Link to={item['@id']} className="summary url" title={item['@type']}>
          {item.title}
        </Link>
      </h2>
      {item?.highlighting && item.highlighting.length > 0 ? (
        <div className="tileBody">
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
          <span className="description">
            {item.description
              ? item.description.length > 200
                ? item.description.slice(0, 199) + '...'
                : item.description
              : ''}
          </span>
        </div>
      )}
      <div className="tileFooter">
        {(item?.effective || item?.extras?.start) && (
          <ConcatChildren if1={getImageType(item?.extras?.mime_type)}>
            <Icon className="itemIcon" size="20px" name={newsSVG} />
            <ImageType mimeType={item?.extras?.mime_type} />
            <ResultItemDate
              date={item?.extras?.start ? item.extras.start : item?.effective}
              showIfNotPublished={true}
            />
          </ConcatChildren>
        )}
      </div>
      <div className="visualClear" />
    </article>
  );
};

export default NewsItemResultItem;
