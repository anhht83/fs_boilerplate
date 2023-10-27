import React from "react";

const Th = React.forwardRef((props: any, ref) => {
  const { children, className = "", asElement: Component = "th", ...rest } = props;

  const thClass = `font-normal items-center ${className}`;

  return (
    <Component className={thClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default Th;
