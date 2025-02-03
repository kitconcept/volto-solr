export const getSuggestions = (suggestions, maxLength = 4) =>
  suggestions
    .filter((_, index) => index % 2 === 1)
    .map((suggestionItem) => suggestionItem.suggestion[0])
    .sort()
    .filter(function (item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    })
    .slice(0, maxLength);
