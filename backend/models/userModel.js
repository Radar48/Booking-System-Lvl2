import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

export default User;