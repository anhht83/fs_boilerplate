import React from "react";
import { HiChevronLeft } from "react-icons/hi";

const Prev = (props: any) => {
  const { currentPage, pagerClass, onPrev } = props;

  const disabled = currentPage <= 1;

  const onPrevClick = (e: any) => {
    if (disabled) {
      return;
    }
    onPrev(e);
  };

  const pagerPrevClass = `${pagerClass.default} pagination-pager-prev ${disabled ? pagerClass.disabled : pagerClass.inactive}`;

  return (
    <span className={pagerPrevClass} onClick={onPrevClick}>
      <HiChevronLeft />
    </span>
  );
};

export default Prev;
