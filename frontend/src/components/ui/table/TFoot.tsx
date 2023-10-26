import React, { forwardRef } from "react";

const TFoot = forwardRef((props: any, ref) => {
  const { children, className = '', asElement: Component = "tfoot", ...rest } = props;

  const tBodyClass = `${Component !== "tfoot" && "tfoot"} ${className}`;

  return (
    <Component className={tBodyClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default TFoot;
