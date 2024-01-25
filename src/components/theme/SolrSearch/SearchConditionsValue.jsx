import { Checkbox } from 'semantic-ui-react';
import { useCallback, useMemo } from 'react';

const ValueLabel = ({ value }) => (
  <span className="searchConditionsHasValueLabel">{value}</span>
);

export const SearchConditionsValue = ({
  fieldDef,
  value,
  counter,
  condition,
  setCondition: setC,
}) => {
  const setCondition = useCallback((checked) => setC(value, checked), [
    setC,
    value,
  ]);
  const checked = condition[value];

  return useMemo(
    () =>
      value ? (
        <div className="searchConditionsValue">
          {counter != null ? (
            <div className="searchConditionsCounter ui circular label lightgrey">
              {counter < 100 ? counter : '...'}
            </div>
          ) : (
            <div className="searchConditionsCounter" />
          )}
          <div className="searchConditionsLabel">
            <ValueLabel value={value} />
          </div>
          <div className="searchConditionsCheckbox">
            <Checkbox
              onChange={(e, data) => setCondition(data.checked)}
              checked={checked}
            />
          </div>
        </div>
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(fieldDef), value, counter, checked, setCondition],
  );
};
