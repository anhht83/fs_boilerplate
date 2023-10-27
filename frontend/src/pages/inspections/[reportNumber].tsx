import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

import H1 from "@/components/ui/h1";
import Card from "@/components/ui/card";
import { apiGetInspection } from "@/apis/InspectionApi";
import { useRouter } from "next/router";
import Loading from "@/components/shared/loading";
import { FiPlusCircle } from "react-icons/fi";
import Button from "@/components/ui/button";
import { FaDownload, FaLink, FaSearch } from "react-icons/fa";
import Select from "@/components/ui/select";
import InspectionOverview from "@/pages/inspections/components/InspectionOverview";
import InspectionVehicles from "@/pages/inspections/components/InspectionVehicles";
import InspectionViolations from "@/pages/inspections/components/InspectionViolations";
import Link from "next/link";
import InspectionUploadInfo from "@/pages/inspections/components/InspectionUploadInfo";

const Inspection: NextPageWithLayout = () => {
  const router = useRouter();
  const { reportNumber } = router.query;

  const { isLoading, data } = apiGetInspection(reportNumber, {
    enabled: !!reportNumber
  });

  return (
    <Loading loading={isLoading} type="cover">
      <div className="my-4 flex flex-row items-end justify-between gap-4">
        <div className="flex flex-row items-end gap-2">
          <H1 className="my-0">{reportNumber} </H1>
          <div className="text-gray-500 text-xs flex flex-row gap-1 items-center">
            Pulled from <span className="underline">FMCSA</span> 07/13/24 at 12:33
            <span className="flex flex-row gap-1 items-center ml-1">View History <FiPlusCircle /></span>
          </div>
        </div>
        <div className="flex flex-row items-end justify-between gap-2">
          <Select color="dark" value="action" options={[{ value: "action", label: "Actions" }]}>
          </Select>
          <Button color="dark"><FaLink /></Button>
          <Button color="primary">Mark Resolved</Button>
        </div>
      </div>
      {data && (
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-5">
            <Card>
              <div className="grid gap-6">
                <InspectionOverview data={data} />
                <InspectionVehicles vehicles={data.vehicles ?? []} />
                <InspectionViolations violations={data.violations ?? []} />
              </div>
            </Card>
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <InspectionUploadInfo />
            <Card></Card>
            <div></div>
          </div>
        </div>
      )}
    </Loading>
  );
};

Inspection.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Inspection;
