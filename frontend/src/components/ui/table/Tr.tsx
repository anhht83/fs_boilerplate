import React from "react";

const Tr = React.forwardRef((props: any, ref) => {
  const { children, asElement: Component = "tr", className = "", ...rest } = props;

  const trClass = `${Component !== "tr" && "tr"} ${className}`;

  return (
    <Component className={trClass} ref={ref} {...rest}>
      {children}
    </Component>
  );
});


export default Tr;
