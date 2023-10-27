import InspectionStatusCom from "@/components/shared/inspectionStatusCom";
import H3 from "@/components/ui/h3";
import moment from "moment-timezone";
import { TInspection } from "@/types/inspection";
import Card from "@/components/ui/card";

type IInspectionOverviewProps = {
  data: TInspection
}

const InspectionOverview = ({ data }: IInspectionOverviewProps) => (
  <div>
    <H3>Inspection Overview</H3>
    <div className="grid grid-cols-2 gap-3">
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Status</div>
        <InspectionStatusCom status={data.status} />
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Report Number</div>
        {data.reportNumber}
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">USDOT #</div>
        xxxxx
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Report State</div>
        {data.reportState}
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Date</div>
        {moment(data.inspectionDate).format("MM/DD/YYYY")}
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card color="dark" size="sm">
          <div className="text-xs leading-4">Start Time</div>
          {moment(data.inspectionDate).format("HH:mm")}
        </Card>
        <Card color="dark" size="sm">
          <div className="text-xs leading-4">End Time</div>
          {moment(data.inspectionDate).format("HH:mm")}
        </Card>
      </div>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Level</div>
        {data.level}
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Facility</div>
        facility
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Post Crash Inspection</div>
        {data.hmInspection ? "Yes" : "No"}
      </Card>
      <Card color="dark" size="sm">
        <div className="text-xs leading-4">Hazmat Placard Required</div>
        {data.placarableHmVehInsp ? "Yes" : "No"}
      </Card>
    </div>
  </div>
);

export default InspectionOverview;
