import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional,
  ForeignKey, DataTypes
} from "sequelize";
import { sequelize } from ".";
import { Inspection } from "./inspection";
import { Violation } from "./violation";

export class InspectionViolation extends Model<InferAttributes<InspectionViolation>, InferCreationAttributes<InspectionViolation>> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare unit: string;
  declare oos: boolean;
  declare timeSeverityWeight: number;
  declare convictedOfDifCharge: boolean;
  declare inspectionId: ForeignKey<Inspection["id"]>;
  declare violationId: ForeignKey<Violation["id"]>;
}

InspectionViolation.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  description: DataTypes.STRING,
  unit: DataTypes.STRING,
  oos: {
    type: DataTypes.BOOLEAN,
    set(value) {
      this.setDataValue("oos", ["y", "yes"].includes((value as string).toLowerCase()));
    }
  },
  timeSeverityWeight: DataTypes.NUMBER,
  convictedOfDifCharge: {
    type: DataTypes.BOOLEAN,
    set(value) {
      this.setDataValue("convictedOfDifCharge", ["y", "yes"].includes((value as string).toLowerCase()));
    }
  },
  inspectionId: DataTypes.INTEGER.UNSIGNED,
  violationId: DataTypes.INTEGER.UNSIGNED
}, {
  sequelize,
  tableName: "inspection_violations",
  modelName: "inspectionViolation"
});

