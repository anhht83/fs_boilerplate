import React from "react";

interface ITableComponent extends React.ForwardRefExoticComponent<any> {
  [key: string]: any
}

const Table = React.forwardRef((props: any, ref: any) => {
  const {
    borderlessRow = false,
    children,
    className = "",
    hoverable = true,
    compact = false,
    oveerflow = true,
    asElement: Component = "table",
    ...rest
  } = props;

  const tableClass = [className];
  if (Component === "table") tableClass.push("table-default");
  else tableClass.push("table-flex");
  if (hoverable) tableClass.push("table-hover");
  if (compact) tableClass.push("table-compact");
  if (borderlessRow) tableClass.push("borderless-row");

  return (
    <div className={`${oveerflow && "overflow-x-auto"}`}>
      <Component className={tableClass.join(" ")} {...rest} ref={ref}>
        {children}
      </Component>
    </div>
  );
}) as ITableComponent;

export default Table;
