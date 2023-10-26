import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional,
  ForeignKey, DataTypes
} from "sequelize";
import { sequelize } from ".";
import { Inspection } from "./inspection";
import { Vehicle } from "./vehicle";

export class InspectionVehicle extends Model<InferAttributes<InspectionVehicle>, InferCreationAttributes<InspectionVehicle>> {
  declare id: CreationOptional<number>;
  declare inspectionId: ForeignKey<Inspection["id"]>;
  declare vehicleId: ForeignKey<Vehicle["id"]>;
}

InspectionVehicle.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  inspectionId: DataTypes.INTEGER.UNSIGNED,
  vehicleId: DataTypes.INTEGER.UNSIGNED
}, {
  sequelize,
  tableName: "inspection_vehicles",
  modelName: "inspectionVehicle"
});
