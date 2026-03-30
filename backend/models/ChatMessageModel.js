
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ChatMessage = sequelize.define("ChatMessage", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: true });

export default ChatMessage;