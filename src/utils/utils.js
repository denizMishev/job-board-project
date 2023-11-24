import _ from "lodash";

export const returnPaginationRange = (
  totalPages,
  currentPage,
  limit,
  siblings
) => {
  let totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPages) {
    return _.range(1, totalPages + 1);
  }
  let leftSiblingsIndex = Math.max(currentPage - siblings, 1);
  let rightSiblingsIndex = Math.min(currentPage + siblings, totalPages);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, "...", totalPages];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPages - rightItemsCount + 1, totalPages + 1);
    return [1, "...", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "...", ...middleRange, "...", totalPages];
  }
};
