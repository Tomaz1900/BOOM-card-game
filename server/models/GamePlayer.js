import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const GamePlayer = sequelize.define("GamePlayer", {
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chips: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  status: {
    type: DataTypes.ENUM("waiting", "playing", "folded", "out"),
    allowNull: false,
    defaultValue: "waiting",
  },
});
