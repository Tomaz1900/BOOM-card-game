import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Token = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
