import { Request, Response, NextFunction } from "express";
import { Vehicle } from "../models/vehicle";
import { VehicleType } from "../models/vehicleType";
import { slugify } from "../utils/helpers";
import { Basic } from "../models/basic";
import { Violation } from "../models/violation";
import { Inspection, InspectionStatus, TInspectionStatus } from "../models/inspection";
import { InspectionVehicle } from "../models/inspectionVehicle";
import { InspectionViolation } from "../models/inspectionViolation";
import APIError from "../utils/APIError";
import httpStatus from "http-status";

const fs = require("fs");
const xml2js = require("xml2js");

interface MulterRequest extends Request {
  file: any;
}

class InspectionController {
  /* route: /import/inspection
   * parse values of xml file, then using bulkCreate to store to data
   */
  static async importInspections(req: MulterRequest, res: Response, next: NextFunction) {
    try {
      // cache variables
      let cacheVehicles: any = {};
      let cacheVehicleTypes: any = {};
      let cacheViolations: any = {};
      let cacheBasics: any = {};
      let cacheInspections: any = {};

      const parser = new xml2js.Parser();
      const text = fs.readFileSync(req.file.path, "utf8");
      parser.parseString(text, async function(err: any, result: any) {
        /* read and parse xml file */
        // loop through inspections
        const inspections = result.carrierData.inspections[0].inspection;
        inspections.forEach((inspection: any, index: number) => {
          // Step 1: parse inspection report information
          const {
            report_number: reportNumber,
            inspection_date: inspectionDate,
            report_state: reportState,
            level,
            time_weight: timeWeight,
            Placarable_HM_Veh_Insp: placarableHmVehInsp,
            HM_inspection: hmInspection
          } = inspection["$"];
          if (!reportNumber) return;
          cacheInspections[reportNumber] = {
            reportNumber,
            inspectionDate,
            reportState,
            level,
            timeWeight,
            placarableHmVehInsp,
            hmInspection,
            vehicles: [],
            violations: []
          };

          // step 2: parse vehicles (tractor, trailer)
          inspection.vehicles[0].vehicle.forEach((vehicle: any) => {
            const {
              unit,
              vehicle_id_number: vin,
              unit_type: type = "Unknown",
              license_state: licenseState,
              license_number: licenseNumber
            } = vehicle["$"];
            // continue loop if there is no vehicle info
            if (!vin) return;
            // parse vehicle type
            const slugType = slugify(type);
            cacheVehicleTypes[slugType] = {
              slug: slugType,
              name: type,
              unit
            };

            // TODO xml file is missing vehicle make
            // parse vehicle
            cacheVehicles[vin] = {
              vin,
              licenseNumber,
              licenseState,
              vehicleTypeSlug: cacheVehicleTypes[slugType].slug
            };
            // connect vehicle to inspection
            cacheInspections[reportNumber].vehicles.push(vin);
          });

          // step 3: parse inspection violations
          inspection.violations[0].violation.forEach((violation: any) => {
            const {
              code,
              description,
              BASIC: basic = "Unknown",
              oos,
              time_severity_weight: timeSeverityWeight,
              unit,
              convicted_of_dif_charge: convictedOfDifCharge
            } = violation["$"];

            // continue loop if there is no violation
            if (!code) return;
            // parse basic
            const slugBasic = slugify(basic);
            cacheBasics[slugBasic] = { name: basic, slug: slugBasic };
            // parse violation
            cacheViolations[code] = {
              code,
              description,
              basicSlug: cacheBasics[slugBasic].slug
            };
            // connect violation to inspection
            cacheInspections[reportNumber].violations.push({
              code, oos, unit, timeSeverityWeight, convictedOfDifCharge
            });
          });
        });
      });

      /* update to database */
      // update vehicle type to db
      const exitingVehicleTypes = await VehicleType.findAll({
        where: { slug: Object.keys(cacheVehicleTypes) },
        attributes: ["id", "slug"]
      });
      const slugOfExitingVehicleTypes = exitingVehicleTypes.reduce((acc: string[], item: VehicleType) => {
        acc.push(item.slug);
        return acc;
      }, []);
      const newVehicleTypes = await VehicleType.bulkCreate(
        Object.values(cacheVehicleTypes).filter((item: any) =>
          !slugOfExitingVehicleTypes.includes(item.slug)
        )
      );
      cacheVehicleTypes = [...exitingVehicleTypes, ...newVehicleTypes].reduce((acc: any, item: VehicleType) => {
        acc[item.slug] = item;
        return acc;
      }, {});

      // update vehicle to db
      const exitingVehicles = await Vehicle.findAll({
        where: { vin: Object.keys(cacheVehicles) },
        attributes: ["id", "vin"]
      });
      const vinOfExitingVehicles = exitingVehicles.reduce((acc: string[], item: Vehicle) => {
        acc.push(item.vin);
        return acc;
      }, []);
      const newVehicles = await Vehicle.bulkCreate(
        Object.values(cacheVehicles).filter((item: any) =>
          !vinOfExitingVehicles.includes(item.vin)
        ).map(({ vehicleTypeSlug, ...item }) => ({
          ...item,
          vehicleTypeId: cacheVehicleTypes[vehicleTypeSlug].id
        }))
      );
      cacheVehicles = [...exitingVehicles, ...newVehicles].reduce((acc: any, item: Vehicle) => {
        acc[item.vin] = item;
        return acc;
      }, {});

      // update basic to db
      const exitingBasics = (await Basic.findAll({
        where: { slug: Object.keys(cacheBasics) },
        attributes: ["id", "slug"]
      }));
      const slugOfExistingBasics = exitingBasics.reduce((acc: string[], item: Basic) => {
        acc.push(item.slug);
        return acc;
      }, []);
      const newBasics = await Basic.bulkCreate(Object.values(cacheBasics).filter((basic: any) => !slugOfExistingBasics.includes(basic.slug)));
      cacheBasics = [...exitingBasics, ...newBasics].reduce((acc: any, item: Basic) => {
        acc[item.slug] = item;
        return acc;
      }, {});

      // update violations to db
      const exitingViolations = await Violation.findAll({
        where: { code: Object.keys(cacheViolations) },
        attributes: ["id", "code"]
      });
      const codeOfExitingViolations = exitingViolations.reduce((acc: string[], item: Violation) => {
        acc.push(item.code);
        return acc;
      }, []);
      const newViolations = await Violation.bulkCreate(
        Object.values(cacheViolations).filter((item: any) =>
          !codeOfExitingViolations.includes(item.code)
        ).map(({ basicSlug, ...item }: any) => ({
          ...item,
          basicId: cacheBasics[basicSlug].id
        }))
      );
      cacheViolations = [...exitingViolations, ...newViolations].reduce((acc: any, item: Violation) => {
        acc[item.code] = item;
        return acc;
      }, {});

      // update inspection to db
      const exitingInspections = (await Inspection.findAll({
        where: { reportNumber: Object.keys(cacheInspections) },
        attributes: ["id", "reportNumber"]
      })).reduce((acc: string[], item: Inspection) => {
        acc.push(item.reportNumber);
        return acc;
      }, []);

      const newInspections = await Inspection.bulkCreate(
        Object.values(cacheInspections).filter((item: any) =>
          !exitingInspections.includes(item.reportNumber)
        ).map(({ vehicles, violations, ...item }) => ({
          ...item,
          status: (!violations || !violations.length) ? InspectionStatus.noViolation : InspectionStatus.unresolved
        }))
      );

      // map vehicles/violations to inspection
      const {
        inspectionVehicleRecords,
        inspectionViolationRecords
      } = newInspections.reduce((acc: any, item: Inspection) => {
        cacheInspections[item.reportNumber].vehicles.forEach((vin: string) => {
          acc.inspectionVehicleRecords.push({
            inspectionId: item.id,
            vehicleId: cacheVehicles[vin].id
          } as InspectionVehicle);
        });

        cacheInspections[item.reportNumber].violations.forEach((violation: any) => {
          const { code, ...restAttributes } = violation;
          acc.inspectionViolationRecords.push({
            inspectionId: item.id,
            violationId: cacheViolations[code].id,
            ...restAttributes
          } as InspectionViolation);
        });

        return acc;
      }, { inspectionVehicleRecords: [], inspectionViolationRecords: [] });

      await InspectionVehicle.bulkCreate(inspectionVehicleRecords);
      await InspectionViolation.bulkCreate(inspectionViolationRecords);

      return res.json(true);
    } catch (error) {
      return next(error);
    }
  }

  // fetch list of inspections
  static async fetchInspections(req: Request, res: Response, next: NextFunction) {
    try {
      const { pageIndex, pageSize, sort, query }: any = req.query;

      const options: any = {
        distinct: true,
        offset: (Number(pageIndex) - 1) * Number(pageSize),
        limit: Number(pageSize),
        include: [
          {
            model: Vehicle,
            as: "vehicles",
            include: ["vehicleType"]
          }
        ]
      };

      // include violations & filter basic
      const includeViolations: any = {
        model: Violation,
        as: "violations",
        include: ["basic"]
      };
      if (query?.basic) {
        includeViolations.where = { basicId: query.basic };
      }
      options.include.push(includeViolations);

      if (query?.status) {
        options.where = { status: query.status };
      }

      // build order
      if (sort?.key) {
        options.order = [[sort.key, sort.order]];
      }

      const { count, rows } = await Inspection.findAndCountAll(options);
      return res.json({ total: count, rows });
    } catch (error) {
      return next(error);
    }
  }

  // get detail inspection
  static async getInspection(req: Request, res: Response, next: NextFunction) {
    try {
      const { reportNumber } = req.params;
      const inspection = await Inspection.findOne({
        where: { reportNumber },
        include: [
          {
            model: Vehicle,
            as: "vehicles",
            include: ["vehicleType"]
          },
          {
            model: Violation,
            as: "violations",
            include: ["basic"]
          }
        ]
      });
      if (!inspection)
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Inspection is not found"
        });

      return res.json(inspection);
    } catch (error) {
      return next(error);
    }
  }

  // resolved/unresolved
  static async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, status } = req.params;
      const inspection = await Inspection.findByPk(id);
      if (!inspection)
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Inspection is not found"
        });

      await inspection.update({ status: status as TInspectionStatus });

      return res.json(inspection);
    } catch (error) {
      return next(error);
    }
  }
}

export default InspectionController;
