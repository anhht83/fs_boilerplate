import React from "react";
import DataTable from "@/components/shared/dataTable";
import moment from "moment-timezone";
import { FaLink, FaTrailer, FaTruck, FaUser } from "react-icons/fa6";
import { Unit } from "@/consts";
import { TInspection, TInspectionTableData, TVehicle, TViolation } from "@/types/inspection";
import { TSort, TTableDataRes } from "@/types/dataTable";
import InspectionStatusCom from "@/components/shared/inspectionStatusCom";

type TInspectionTableProps = {
  tableData: TInspectionTableData,
  setTableData: (values: TInspectionTableData) => void,
  data: TTableDataRes<TInspection> | undefined,
  isLoading: boolean
}

const ShowRow = ({ row, className = "", children }: any) => {
  let _className = `${className}`;
  const status = row.status;
  if (status === "unresolved") _className += " font-semibold";
  return <div className={_className}>{children}</div>;
};

const InspectionTable = ({ tableData, setTableData, data, isLoading }: TInspectionTableProps) => {

  const columns = [
    {
      header: "Date",
      accessorKey: "inspectionDate",
      cell: (props: any) => {
        const row: TInspection = props.row.original;
        const inspectionDate = moment(row.inspectionDate);
        return (
          <ShowRow row={row}>
            {moment().isSame(inspectionDate) ? "Today" : inspectionDate.format("MM/DD/YY")}
          </ShowRow>
        );
      }
    },
    {
      header: "Status",
      cell: (props: any) => {
        const row: TInspection = props.row.original;
        return (
          <ShowRow row={row}>
            <InspectionStatusCom status={row.status} />
          </ShowRow>
        );
      }
    },
    {
      header: "Inspection Number",
      id: "reportNumber",
      cell: (props: any) => {
        const row: TInspection = props.row.original;
        return (
          <ShowRow row={row}>{row.reportNumber}</ShowRow>
        );
      }
    },
    {
      header: "Vehicle Plate",
      id: "licenseNumber",
      cell: (props: any) => {
        const { vehicles = [] }: TInspection = props.row.original;
        return (
          <ShowRow row={props.row.original}>
            {vehicles.find((vehicle: TVehicle) => vehicle.vehicleType?.unit === Unit.TRUCK)?.licenseNumber ?? "-"}
          </ShowRow>
        );
      }
    },
    {
      header: "BASIC",
      id: "basic",
      cell: (props: any) => {
        const { violations = [] }: TInspection = props.row.original;
        return (
          <ShowRow row={props.row.original}>
            {Object.values(violations.reduce((acc: any, violation: TViolation) => {
              if (violation.basic?.slug) acc[violation.basic?.slug] = violation.basic?.name;
              return acc;
            }, {})).join(", ") || "-"}
          </ShowRow>
        );
      }
    },
    {
      header: () => <div className="text-center">Weight</div>,
      id: "timeWeight",
      cell: (props: any) => {
        const row: TInspection = props.row.original;
        return (
          <ShowRow row={row}>
            <div className="text-center">{row.timeWeight}</div>
          </ShowRow>
        );
      }
    },
    {
      header: "Links",
      id: "Links",
      cell: () => (
        <div className="flex gap-3 items-center">
              <span className={`cursor-pointer`}>
                <FaUser />
              </span>
          <span className="cursor-pointer">
                <FaTruck />
              </span>
          <span className="cursor-pointer">
                <FaTrailer />
              </span>
          <span className="cursor-pointer">
                <FaLink />
              </span>
        </div>
      )
    }
  ];

  const onPaginationChange = (pageIndex: number) => {
    setTableData({ pageIndex });
  };

  const onSelectChange = (value: string | number) => {
    setTableData({
      pageSize: Number(value),
      pageIndex: 1
    });
  };

  const onSort = (sort: TSort) => {
    setTableData({ sort, pageIndex: 1 });
  };

  return (
    <DataTable
      columns={columns}
      data={data?.rows ?? []}
      loading={isLoading}
      pagingData={{
        ...tableData,
        total: data?.total ?? 0
      }}
      selectable
      onPaginationChange={onPaginationChange}
      onSelectChange={onSelectChange}
      onSort={onSort}
    />
  );
};


export default InspectionTable;
