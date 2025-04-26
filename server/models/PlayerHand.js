import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PlayerHand = sequelize.define("PlayerHand", {
  card_1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  card_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  card_3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
