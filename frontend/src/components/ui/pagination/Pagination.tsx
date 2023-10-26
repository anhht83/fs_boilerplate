import React, { useState, useEffect, useMemo, useCallback } from "react";
import Pager from "./Pagers";
import Prev from "./Prev";
import Next from "./Next";
import Total from "./Total";

const Pagination = (props: any) => {
  const { className = "", currentPage = 1, displayTotal = false, onChange, pageSize = 1, total = 5 } =
    props;

  const [paginationTotal, setPaginationTotal] = useState(total);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);

  const getInternalPageCount = useMemo(() => {
    if (typeof paginationTotal === "number") {
      return Math.ceil(paginationTotal / internalPageSize);
    }
    return null;
  }, [paginationTotal, internalPageSize]);

  const getValidCurrentPage = useCallback(
    (count: any) => {
      const value = parseInt(count, 10);
      let internalPageCount = getInternalPageCount;
      let resetValue;
      if (!internalPageCount) {
        if (isNaN(value) || value < 1) {
          resetValue = 1;
        }
      } else {
        if (value < 1) {
          resetValue = 1;
        }
        if (value > internalPageCount) {
          resetValue = internalPageCount;
        }
      }

      if (
        (resetValue === undefined && isNaN(value)) ||
        resetValue === 0
      ) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    },
    [getInternalPageCount]
  );

  const [internalCurrentPage, setInternalCurrentPage] = useState(
    currentPage ? getValidCurrentPage(currentPage) : 1
  );

  useEffect(() => {
    if (total !== paginationTotal) {
      setPaginationTotal(total);
    }

    if (pageSize !== internalPageSize) {
      setInternalPageSize(pageSize);
    }

    if (currentPage !== internalCurrentPage) {
      setInternalCurrentPage(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, pageSize, currentPage]);

  const onPaginationChange = (val: any) => {
    setInternalCurrentPage(getValidCurrentPage(val));
    onChange?.(getValidCurrentPage(val));
  };

  const onPrev = useCallback(() => {
    const newPage = internalCurrentPage - 1;
    setInternalCurrentPage(getValidCurrentPage(newPage));
    onChange?.(getValidCurrentPage(newPage));
  }, [onChange, internalCurrentPage, getValidCurrentPage]);

  const onNext = useCallback(() => {
    const newPage = internalCurrentPage + 1;
    setInternalCurrentPage(getValidCurrentPage(newPage));
    onChange?.(getValidCurrentPage(newPage));
  }, [onChange, internalCurrentPage, getValidCurrentPage]);

  const pagerClass = {
    default: "pagination-pager text-xs h-[24px]",
    inactive: "pagination-pager-inactive text-xs h-[24px]",
    active: `text-gray-800 bg-gray-100 hover:bg-gray-100 dark:bg-gray-200 dark:text-gray-100 py-0 px-3 text-xs h-[24px]`,
    disabled: "pagination-pager-disabled  text-xs h-[24px]"
  };

  const paginationClass = `pagination text-xs text-gray-400 ${className}`;

  return (
    <div className={paginationClass}>
      {displayTotal && <Total total={total} />}
      <Prev
        currentPage={internalCurrentPage}
        pagerClass={pagerClass}
        onPrev={onPrev}
      />
      <Pager
        onChange={onPaginationChange}
        pageCount={getInternalPageCount}
        currentPage={internalCurrentPage}
        pagerClass={pagerClass}
      />
      <Next
        currentPage={internalCurrentPage}
        pageCount={getInternalPageCount}
        pagerClass={pagerClass}
        onNext={onNext}
      />
    </div>
  );
};


export default Pagination;
