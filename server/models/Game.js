import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Game = sequelize.define("Game", {
  status: {
    type: DataTypes.ENUM("waiting", "started", "finished"),
    allowNull: false,
    defaultValue: "waiting",
  },
  started_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finished_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
