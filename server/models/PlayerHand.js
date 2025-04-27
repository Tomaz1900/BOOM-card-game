import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PlayerHand = sequelize.define("PlayerHand", {
  game_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  card2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  card3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: true, // leidžiam pradžioje palikti tuščią
  },
});
