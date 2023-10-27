import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
  Association,
  BelongsToManyAddAssociationsMixin, BelongsToManyAddAssociationMixin, Attributes
} from "sequelize";
import { sequelize } from ".";
import { InspectionViolation } from "./inspectionViolation";
import { Violation } from "./violation";
import { Vehicle } from "./vehicle";
import { InspectionVehicle } from "./inspectionVehicle";

export const InspectionStatus = {
  resolved: "resolved",
  unresolved: "unresolved",
  noViolation: "noViolation"
};

export type TInspectionStatus = typeof InspectionStatus[keyof typeof InspectionStatus];

export class Inspection extends Model<InferAttributes<Inspection>, InferCreationAttributes<Inspection>> {
  declare id: CreationOptional<number>;
  declare reportNumber: string;
  declare inspectionDate: string;
  declare reportState: string;
  declare level: number;
  declare timeWeight: number;
  declare placarableHmVehInsp: boolean;
  declare hmInspection: boolean;
  declare status: TInspectionStatus;

  declare vehicles?: NonAttribute<Vehicle[]>;
  declare violations?: NonAttribute<Violation[]>;

  declare addVehicle: BelongsToManyAddAssociationMixin<Vehicle, number>;
  declare addVehicles: BelongsToManyAddAssociationsMixin<Vehicle, number>;
  declare addViolation: BelongsToManyAddAssociationMixin<Violation, number>;
  declare addViolations: BelongsToManyAddAssociationsMixin<Violation, number>;

  declare static associations: {
    vehicles: Association<Inspection, Vehicle>;
    violations: Association<Inspection, Violation>;
  };
}

Inspection.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  reportNumber: DataTypes.STRING,
  inspectionDate: DataTypes.DATEONLY,
  reportState: DataTypes.STRING,
  level: DataTypes.INTEGER,
  timeWeight: DataTypes.INTEGER,
  placarableHmVehInsp: {
    type: DataTypes.BOOLEAN,
    set(value) {
      this.setDataValue("placarableHmVehInsp", ["y", "yes"].includes((value as string).toLowerCase()));
    }
  },
  hmInspection: {
    type: DataTypes.BOOLEAN,
    set(value) {
      this.setDataValue("hmInspection", ["y", "yes"].includes((value as string).toLowerCase()));
    }
  },
  status: {
    type: DataTypes.STRING,
    get() {
      const status = this.getDataValue("status");
      if (status) return status;
      const violations = this.violations;
      if (!violations || !violations.length) return InspectionStatus.noViolation;
      return InspectionStatus.unresolved;
    }
  }
}, {
  sequelize,
  tableName: "inspections",
  modelName: "inspection"
});

Inspection.belongsToMany(Violation, {
  through: InspectionViolation
});

Inspection.belongsToMany(Vehicle, {
  as: "vehicles",
  through: InspectionVehicle
});
