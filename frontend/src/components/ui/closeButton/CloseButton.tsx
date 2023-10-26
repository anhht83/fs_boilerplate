import React from "react";
import { HiX } from "react-icons/hi";

interface ICloseButtonComponent extends React.ForwardRefExoticComponent<any> {
  [key: string]: any
}

const CloseButton = React.forwardRef((props: any, ref) => {
  const { absolute, className, defaultStyle = true, svgClass, ...rest } = props;
  const closeButtonAbsoluteClass = "absolute z-10";

  const closeButtonClass = `close-btn ${defaultStyle && "close-btn-default"} ${absolute && closeButtonAbsoluteClass} ${className}`;

  return (
    <span className={closeButtonClass} role="button" {...rest} ref={ref}>
        <HiX />
    </span>
  );
}) as ICloseButtonComponent;

export default CloseButton;
