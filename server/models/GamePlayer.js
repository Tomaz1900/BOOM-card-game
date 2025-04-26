import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const GamePlayer = sequelize.define("GamePlayer", {
  seat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_owner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_folded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
