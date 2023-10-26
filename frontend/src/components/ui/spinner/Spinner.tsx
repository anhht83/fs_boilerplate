import React from "react";
import { CgSpinner } from "react-icons/cg";

const Spinner = React.forwardRef((props: any, ref) => {
  const {
    className,
    color,
    indicator: Component = CgSpinner,
    isSpining = true,
    size = 20,
    style,
    ...rest
  } = props;


  const spinnerStyle = {
    height: size,
    width: size,
    ...style
  };

  const spinnerClass = `${color && `text-${color}`} ${isSpining && "animate-spin"} ${className}`;

  return (
    <Component
      ref={ref}
      style={spinnerStyle}
      className={spinnerClass}
      {...rest}
    />
  );
});

export default Spinner;
