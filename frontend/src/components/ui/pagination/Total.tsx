import React from "react";

const Total = (props: any) => {
  const { total } = props;
  return (
    <div className="pagination-total">
      Total <span>{total}</span> Items
    </div>
  );
};

export default Total;
