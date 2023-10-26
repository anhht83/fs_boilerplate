import React from "react";

const Td = React.forwardRef((props: any, ref) => {
  const { children, className = "", asElement: Component = "td", ...rest } = props;

  const tdClass = `border-b text-sm items-center ${className}`;

  return (
    <Component className={tdClass} ref={ref} {...rest}>
      {children}
    </Component>
  );
});

export default Td;
