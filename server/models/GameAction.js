import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const GameAction = sequelize.define("GameAction", {
  game_player_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action_type: {
    type: DataTypes.ENUM(
      "dark_turn",
      "check",
      "open_turn",
      "take_a_look",
      "open_against",
      "fold",
      "show_hand",
      "boom",
      "boom_500",
      "lost_boom_250",
      "no_check"
    ),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
