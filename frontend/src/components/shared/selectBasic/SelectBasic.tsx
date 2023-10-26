import React from "react";
import Select from "@/components/ui/select";
import { apiFetchBasics } from "@/apis/InspectionApi";

const SelectBasic = ({ name = "", onChange, ...restProps }: any) => {
  const queryBasic = apiFetchBasics();

  return (
    <Select
      {...restProps}
      name={name}
      onChange={onChange}
      label="BASIC:"
      loading={queryBasic.isLoading}
      placeholder="Select BASIC"
      options={(queryBasic.data ?? []).map((basic) => ({
        value: basic.id,
        label: basic.name
      }))}
    />
  );
};

export default SelectBasic;
