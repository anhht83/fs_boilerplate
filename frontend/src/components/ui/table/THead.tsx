import React from "react";

const THead = React.forwardRef((props: any, ref) => {
  const { children, asElement: Component = "thead", className = "", ...rest } = props;

  const tHeadClass = `${Component !== "thead" && "thead"} ${className}`;

  return (
    <Component className={tHeadClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default THead;
