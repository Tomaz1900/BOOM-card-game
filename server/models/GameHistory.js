import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const GameHistory = sequelize.define("GameHistory", {
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
