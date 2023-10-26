import React from "react";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import SelectBasic from "@/components/shared/selectBasic";
import { Formik } from "formik";
import { TInspectionQuery, TInspectionTableData } from "@/types/inspection";
import InspectionStatusCom from "@/components/shared/inspectionStatusCom";

type TInspectionFilterProps = {
  tableData: TInspectionTableData,
  setFilter: (values: TInspectionQuery) => void,
  isLoading: boolean
}

const InspectionFilter = ({ tableData, setFilter, isLoading }: TInspectionFilterProps) => (
  <Formik
    onSubmit={setFilter}
    enableReinitialize
    initialValues={{
      status: tableData?.query?.status ?? "",
      basic: tableData?.query?.basic ?? ""
    }}>
    {({ values, handleChange, handleSubmit }) => (
      <form>
        <div className="flex flex-row items-center justify-between gap-3 mb-3">
          <div className="flex flex-row gap-3">
            <Select
              color="info"
              label="Assign to:"
              placeholder="Select"
              value={1}
              options={[{ value: 1, label: "You" }]}
            />
            <InspectionStatusCom.Select
              name="status"
              value={values.status}
              onChange={handleChange}
            />
            <SelectBasic
              name="basic"
              onChange={handleChange}
              value={values.basic}
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <FaSearch />
            </Button>
          </div>
          <div
            className="font-semibold cursor-pointer"
            onClick={() => setFilter({ status: "", basic: "" })}
          >
            Clear Filters
          </div>
        </div>
      </form>
    )}
  </Formik>
);

export default InspectionFilter;
