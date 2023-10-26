import {
  Model,
  InferCreationAttributes,
  CreationOptional,
  ModelValidateOptions,
  ModelScopeOptions,
  InferAttributes, DataTypes
} from "sequelize";
import passwordEncrypt from "../utils/passwordEncrypt";
import APIError from "../utils/APIError";
import httpStatus from "http-status";
import { sequelize } from ".";
import { Token } from "./token";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id?: CreationOptional<number>;
  declare email: string;
  declare password?: string;

  static readonly scopes: ModelScopeOptions = {};

  static readonly validations: ModelValidateOptions = {};
}

User.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", passwordEncrypt.generate(value));
    }
  }
}, {
  sequelize,
  tableName: "users",
  modelName: "User",
  hooks: {
    async beforeCreate(attributes, options) {
      const user = await this.findOne({ where: { email: attributes.email } });
      if (user) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: "This email is existed"
        });
      }
    }
  }
});

User.hasMany(Token, {
  foreignKey: "userId"
});

Token.belongsTo(User, {
  foreignKey: "userId"
});
