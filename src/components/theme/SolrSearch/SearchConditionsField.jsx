import { SearchConditionsValue } from './SearchConditionsValue';
import { useCallback, useMemo } from 'react';
import { ShowMoreIndicator } from './ShowMoreIndicator';
import { SearchConditionsFieldSearch } from './SearchConditionsFieldSearch';
import { useIntl, defineMessages } from 'react-intl';

const empty = {};

const getIntlMessage = (id) => ({ id, defaultMessage: id });

export const SearchConditionsField = ({
  fieldDef,
  values: v,
  conditionTree: c,
  setCondition: setC,
  setPrefix: setP,
  setMore: setM,
}) => {
  const intl = useIntl();
  const { name } = fieldDef;
  const setCondition = useCallback(
    (value, checked) => setC(name, value, checked),
    [setC, name],
  );
  const condition = useMemo(() => c[name]?.c || empty, [c, name]);
  const setPrefix = (prefix) => setP(name, prefix);
  const prefix = c[name]?.p;
  const setMore = (more) => setM(name, more);
  const more = c[name]?.m;

  // Sorting values by count, alphabetic
  const selectValues = useMemo(
    () =>
      v.toSorted(
        ([aLabel, aCount], [bLabel, bCount]) =>
          Math.sign(bCount - aCount) * 2 +
          Math.sign(aLabel.localeCompare(bLabel)),
      ),
    [v],
  );

  const remainingSelected = useMemo(
    () =>
      Object.entries(
        selectValues.reduce(
          (remaining, [value, _]) => ({
            ...remaining,
            [value]: false,
          }),
          condition,
        ),
      ).reduce(
        (remainingSelected, [name, check]) =>
          check ? remainingSelected.concat([name]) : remainingSelected,
        [],
      ),
    [condition, selectValues],
  );

  const values = useMemo(
    () => selectValues.concat(remainingSelected.map((value) => [value, null])),
    [selectValues, remainingSelected],
  );

  return useMemo(
    () => (
      <div className="searchConditionsField">
        <div className="searchConditionsFieldHeader">
          {intl.formatMessage(getIntlMessage(fieldDef.label ?? fieldDef.name))}
          <SearchConditionsFieldSearch value={prefix} setValue={setPrefix} />
        </div>
        <div className="searchConditionsFieldContent">
          {values.map(([value, counter], index) => (
            <SearchConditionsValue
              key={index}
              fieldDef={fieldDef}
              value={value}
              counter={counter}
              condition={condition}
              setCondition={setCondition}
            />
          ))}
        </div>
        <div className="searchConditionsFieldFooter">
          <ShowMoreIndicator value={more} setValue={setMore} />
        </div>
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(fieldDef),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(values),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      prefix,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      more,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(condition),
    ],
  );
};
