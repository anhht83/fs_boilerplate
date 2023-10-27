import React from 'react';
import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

import H1 from "@/components/ui/h1";
import Card from "@/components/ui/card";
import { apiChangeStatusInspection, apiGetInspection } from "@/apis/InspectionApi";
import { useRouter } from "next/router";
import Loading from "@/components/shared/loading";
import { FiPlusCircle } from "react-icons/fi";
import Button from "@/components/ui/button";
import { FaLink } from "react-icons/fa";
import Select from "@/components/ui/select";
import InspectionOverview from "@/pages/inspections/components/InspectionOverview";
import InspectionVehicles from "@/pages/inspections/components/InspectionVehicles";
import InspectionViolations from "@/pages/inspections/components/InspectionViolations";
import InspectionUploadInfo from "@/pages/inspections/components/InspectionUploadInfo";
import { InspectionStatus } from "@/consts";
import { TInspectionStatus } from "@/types/inspection";
import Alert from "@/components/ui/alert";

const Inspection: NextPageWithLayout = () => {
  const router = useRouter();
  const { reportNumber } = router.query;

  const { isLoading, data, refetch, error: getInspectionError } = apiGetInspection(reportNumber, {
    enabled: !!reportNumber
  });

  const mutationChangeStatus = apiChangeStatusInspection();

  const error = getInspectionError || mutationChangeStatus.error;

  const newStatusShouldBe = (data?.status === "resolved" ? "unresolved" : "resolved") as TInspectionStatus;

  const handleChangeStatus = () => {
    if (data) {
      mutationChangeStatus.mutate({
        id: data.id,
        status: newStatusShouldBe
      }, {
        onSuccess: () => {
          refetch();
        }
      });
    }
  };

  return (
    <Loading loading={isLoading || mutationChangeStatus.isPending} type="cover">
      {error && <Alert>{error.response?.data?.message ?? error.message}</Alert>}
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
          <Button
            color="primary"
            onClick={handleChangeStatus}>Mark {InspectionStatus[newStatusShouldBe]}</Button>
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
            <Card
              className="py-2 px-4"
              footer={<div className="text-sm text-center">Linked Via Samsara</div>}
            >
              Profile
            </Card>
            <Card className="py-2 px-4">Truck info</Card>
            <Card className="py-2 px-4">Trailer info</Card>
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
