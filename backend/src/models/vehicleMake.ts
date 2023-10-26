import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { sequelize } from ".";

export class VehicleMake extends Model<InferAttributes<VehicleMake>, InferCreationAttributes<VehicleMake>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
}

VehicleMake.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  slug: DataTypes.STRING
}, {
  sequelize,
  tableName: "vehicle_makes",
  modelName: "VehicleMake"
});
