import React from "react";
import Table from "@/components/ui/table";
import H3 from "@/components/ui/h3";
import { TVehicle } from "@/types/inspection";
import Card from "@/components/ui/card";

type TInspectionVehiclesProps = {
  vehicles: TVehicle[]
}

const InspectionVehicles = ({ vehicles }: TInspectionVehiclesProps) => (
  <div>
    <H3>Vehicle Information</H3>
    <Card color="dark" size="sm">
      <Table className="text-center">
        <Table.THead className='border-t-0'>
          <Table.Tr>
            <Table.Th className="!text-center">Unit</Table.Th>
            <Table.Th className="!text-center">Type</Table.Th>
            <Table.Th className="!text-center">Make</Table.Th>
            <Table.Th className="!text-center">Plate State</Table.Th>
            <Table.Th className="!text-center">Plate Number</Table.Th>
            <Table.Th className="!text-center">VIN</Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {vehicles.sort((a, b) => {
            if (a.vehicleType.unit > b.vehicleType.unit) return 1;
            if (a.vehicleType.unit < b.vehicleType.unit) return -1;
            return 0;
          }).map((vehicle) => (
            <Table.Tr>
              <Table.Td>
                {vehicle.vehicleType.unit}
              </Table.Td>
              <Table.Td>
                {vehicle.vehicleType.name}
              </Table.Td>
              <Table.Td>
                make
              </Table.Td>
              <Table.Td>
                {vehicle.licenseState}
              </Table.Td>
              <Table.Td>
                {vehicle.licenseNumber}
              </Table.Td>
              <Table.Td>
                {vehicle.vin}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.TBody>
      </Table>
    </Card>
  </div>
);

export default InspectionVehicles;
