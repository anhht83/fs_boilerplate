import { InspectionStatus } from "@/consts";
import { TTableDataReq } from "@/types/dataTable";

export type TVehicleUnit = 1 | 2

export type TVehicleType = {
  id?: number,
  name: string,
  unit: TVehicleUnit,
  slug?: string,
}

export type TVehicle = {
  id?: number,
  licenseNumber: string,
  licenseState: string,
  vin: string,
  vehicleType: TVehicleType,
  vehicleTypeId?: number
}

export type TBasic = {
  id?: number,
  name: string,
  slug?: string,
}
export type TInspectionViolation = {
  convictedOfDifCharge?: boolean,
  description?: string,
  oos: boolean,
  timeSeverityWeight: number,
  unit: TVehicleUnit | "D",
}

export type TViolation = {
  id?: number,
  code: string,
  description: string,
  vin: string
  basic?: TBasic,
  basicId?: number,
  inspectionViolation?: TInspectionViolation
}

export type TInspectionStatus = keyof typeof InspectionStatus;

export type TInspection = {
  id?: number,
  hmInspection?: boolean,
  inspectionDate?: string,
  level?: number
  basic?: TBasic,
  placarableHmVehInsp?: boolean,
  reportNumber: string,
  reportState?: string,
  status?: TInspectionStatus | "",
  timeWeight?: number,
  vehicles?: TVehicle[],
  violations?: TViolation[],
}


/* datatable */
export type TInspectionQuery = {
  status?: any,
  basic?: any,
  assignTo?: any
}
export type TInspectionTableData = TTableDataReq<TInspectionQuery>
