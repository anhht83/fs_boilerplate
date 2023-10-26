import React from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaArrowDownLong, FaArrowsUpDown, FaArrowUpLong } from "react-icons/fa6";
import { RxCaretSort } from "react-icons/rx";

const Sorter = (props: any) => {
  const { sort } = props;
  const color = `text-gray-500`;

  const renderSort = () => {
    if (typeof sort === "boolean" && !sort) {
      return <RxCaretSort />;
    }

    if (typeof sort === "string" && sort === "asc") {
      return <FaArrowDownLong className={`text-xs ${color}`} />;
    }

    if (typeof sort === "string" && sort === "desc") {
      return <FaArrowUpLong className={`text-xs ${color}`} />;
    }
  };

  return <div className="inline-flex">{renderSort()}</div>;
};

export default Sorter;
