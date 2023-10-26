import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

import H1 from "@/components/ui/h1";
import Card from "@/components/ui/card";
import InspectionTable from "@/pages/inspections/components/InspectionTable";
import Import from "@/pages/inspections/components/Import";
import { useState } from "react";
import { apiFetchInspections } from "@/apis/InspectionApi";
import InspectionFilter from "@/pages/inspections/components/InspactionFilter";
import { TInspectionTableData } from "@/types/inspection";

const Inspections: NextPageWithLayout = () => {

  const [tableData, setTableData] = useState<TInspectionTableData>({
    pageIndex: 1,
    pageSize: 10,
    sort: null,
    query: null
  });
  const { pageIndex, pageSize, sort, query } = tableData;

  const fetchInspections = apiFetchInspections({ pageIndex, pageSize, sort, query });

  return (
    <section className="py-6 text-sm">
      <div className="flex flex-row justify-between items-center">
        <H1>DOT Inspections</H1>
        <Import onSuccess={() => fetchInspections.refetch()} />
      </div>
      <Card>
        <InspectionFilter
          tableData={tableData}
          setFilter={(values: any) => {
            setTableData((prevTableData: any) => ({
              ...prevTableData,
              pageIndex: 1,
              sort: "",
              query: values
            }));
          }}
          isLoading={fetchInspections.isLoading}
        />
        <InspectionTable
          tableData={tableData}
          setTableData={(values: any) => {
            setTableData((prevTableData) => ({
              ...prevTableData,
              ...values
            }));
          }}
          data={fetchInspections.data}
          isLoading={fetchInspections.isLoading}
        />
      </Card>
    </section>
  );
};

Inspections.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Inspections;
