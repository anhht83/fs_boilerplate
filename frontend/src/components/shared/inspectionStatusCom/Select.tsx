import React from "react";
import Select from "@/components/ui/select";
import { InspectionStatus } from "@/consts";
import { TInspectionStatus } from "@/types/inspection";

const InspectionSelect = ({ ...restProps }: any) => {
  return (
    <Select
      label="Status:"
      placeholder="Select Status"
      {...restProps}
      options={Object.keys(InspectionStatus).map((status) => ({
        value: status,
        label: InspectionStatus[status as TInspectionStatus]
      }))}
    />
  );
};

export default InspectionSelect;
