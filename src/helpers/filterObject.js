const getNestedProperty = (obj, propertyPath) => {
  const properties = propertyPath.split(".");

  let currentObj = obj;
  for (const prop of properties) {
    if (currentObj && currentObj.hasOwnProperty(prop)) {
      currentObj = currentObj[prop];
    } else {
      return undefined;
    }
  }

  return currentObj;
};

/**
 * filters an array of objects based on a search query applied to specified properties of the objects in the target array.
 *
 * @param {Array<Object>} targetArray - the array of objects to filter.
 * @param {Array<string>} propertiesToFilterThrough - an array of the property paths to filter through. if you provide nested property path using dot notation, e.g., `requirement.items`, `requirement.items1.items2.items3` etc. it will use the value of the most nested property - `.items3 value`.
 * @param {string} valueToFilterFor - the search query string.
 * @param {boolean} matchAllWords - should objects contain full search query or any of the query values.
 * @returns {Array<Object>} filtered array of objects matching the search query.
 *
 * **mechanism:**
 * - creates a concatenated string made up of all the specified property values of an object in the filtered for array, then splits `valueToFilterFor` by " " and matches results within that concatenated string case-insensitively using RegEx.
 *
 * **note:**
 * - does not support array indices in paths (e.g., `'items[0]'`) nor bracket notation (e.g., `requirement[items]`).
 * - specified object property value must be string or array.
 *
 */

export function filterObject(
  targetArray,
  propertiesToFilterThrough,
  valueToFilterFor,
  matchAllWords = true
) {
  const queryWords = valueToFilterFor.toLowerCase().split(" ");

  const filteredArray = targetArray.filter((item) => {
    let combinedString = "";
    for (const propertyPath of propertiesToFilterThrough) {
      const propertyValue = getNestedProperty(item, propertyPath);
      if (propertyValue === undefined) {
        console.warn(
          `property path "${propertyPath}" does not exist on:`,
          item
        );
      } else if (typeof propertyValue === "string") {
        combinedString += ` ${propertyValue}`;
      } else if (Array.isArray(propertyValue)) {
        combinedString += ` ${propertyValue.join(" ")}`;
      }
    }

    combinedString = combinedString.toLowerCase();

    if (matchAllWords) {
      return queryWords.every((word) => {
        const regex = new RegExp(`\\b${word}\\b`);
        return regex.test(combinedString);
      });
    } else {
      return queryWords.some((word) => {
        const regex = new RegExp(`\\b${word}\\b`);
        return regex.test(combinedString);
      });
    }
  });

  return filteredArray;
}
