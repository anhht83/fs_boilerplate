import React from "react";
import Table from "@/components/ui/table";
import H3 from "@/components/ui/h3";
import { TViolation } from "@/types/inspection";
import { ViolationUnit } from "@/consts";
import Card from "@/components/ui/card";

type TInspectionViolationsProps = {
  violations: TViolation[]
}

const InspectionViolations = ({ violations }: TInspectionViolationsProps) => (
  <div>
    <H3>Violations</H3>
    <Card color="dark" size="sm">
      <Table className="text-center">
        <Table.THead className="border-t-0">
          <Table.Tr>
            <Table.Th className="!text-center">Code</Table.Th>
            <Table.Th className="!text-center">Section</Table.Th>
            <Table.Th className="!text-center">Unit</Table.Th>
            <Table.Th className="!text-center">OOS</Table.Th>
            <Table.Th className="!text-center">Description</Table.Th>
            <Table.Th className="!text-center">IN SMS</Table.Th>
            <Table.Th className="!text-center">BASIC</Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {violations.map((violation) => (
            <Table.Tr>
              <Table.Td>
                {violation.code}
              </Table.Td>
              <Table.Td>
                {violation.code}
              </Table.Td>
              <Table.Td>
                {violation.inspectionViolation?.unit ? ViolationUnit[violation.inspectionViolation?.unit] : "-"}
              </Table.Td>
              <Table.Td>
                {violation.inspectionViolation?.oos ? "Yes" : "No"}
              </Table.Td>
              <Table.Td>
                {violation.description}
              </Table.Td>
              <Table.Td>
                {violation.inspectionViolation?.convictedOfDifCharge ? "Yes" : "No"}
              </Table.Td>
              <Table.Td>
                {violation.basic?.name ?? "-"}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.TBody>
      </Table>
    </Card>
  </div>
);

export default InspectionViolations;
