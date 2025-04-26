import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Card = sequelize.define("Card", {
  rank: {
    type: DataTypes.ENUM("9", "10", "J", "Q", "K", "A"),
    allowNull: false,
  },
  suit: {
    type: DataTypes.ENUM("hearts", "diamonds", "clubs", "spades"),
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
