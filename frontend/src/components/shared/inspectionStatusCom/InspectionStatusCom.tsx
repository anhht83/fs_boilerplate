import React from "react";
import { TInspectionStatus } from "@/types/inspection";
import { InspectionStatus } from "@/consts";

interface IInspectionStatusComponent extends React.ForwardRefExoticComponent<any> {
  Select?: any
}

type TInspectionStatusProps = {
  status: TInspectionStatus
  className: string
}

const InspectionStatusCom = React.forwardRef((props: TInspectionStatusProps, ref) => {
    const { status, className = "" } = props;
    let wrapClasses = `inline-flex items-center gap-2 ${className}`;
    let dotClasses = "h-[6px] w-[6px] rounded-full";
    switch (status) {
      case "unresolved":
        dotClasses += " bg-orange-500";
        wrapClasses += " font-bold";
        break;
      case "resolved":
      case "noViolation":
        dotClasses += " bg-gray-300";
        break;
    }
    return (
      <div className={wrapClasses}>
        <div className={dotClasses}></div>
        {InspectionStatus[status]}
      </div>
    );
  }
) as IInspectionStatusComponent;

export default InspectionStatusCom;
