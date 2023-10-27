import React, { forwardRef } from "react";

const TBody = forwardRef((props: any, ref) => {
  const { children, className = "", asElement: Component = "tbody", ...rest } = props;

  const tBodyClass = `${Component !== "tbody" && "tbody"} ${className} text-gray-900`;

  return (
    <Component className={tBodyClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default TBody;
