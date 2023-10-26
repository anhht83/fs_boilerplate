import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional,
  ForeignKey, DataTypes
} from "sequelize";
import { VehicleType } from "./vehicleType";
import { VehicleMake } from "./vehicleMake";
import { sequelize } from ".";

export class Vehicle extends Model<InferAttributes<Vehicle>, InferCreationAttributes<Vehicle>> {
  declare id: CreationOptional<number>;
  declare vin: string;
  declare licenseState: string;
  declare licenseNumber: string;
  declare vehicleTypeId: ForeignKey<VehicleType["id"]>;
  declare vehicleMakeId: ForeignKey<VehicleMake["id"]>;
  declare vehicleType?: VehicleType;
}

Vehicle.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  vin: DataTypes.STRING,
  licenseState: DataTypes.STRING,
  licenseNumber: DataTypes.STRING,
}, {
  sequelize,
  tableName: "vehicles",
  modelName: "Vehicle",
});

Vehicle.belongsTo(VehicleType, {
  as: 'vehicleType',
  foreignKey: "vehicleTypeId"
});
Vehicle.belongsTo(VehicleMake, {
  as: 'vehicleMake',
  foreignKey: "vehicleMakeId"
});
