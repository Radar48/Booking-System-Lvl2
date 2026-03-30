import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './userModel.js';

const Event = sequelize.define('Event', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

// Relationship: Event created by User (admin)
Event.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
User.hasMany(Event, { foreignKey: 'created_by', as: 'events' });

export default Event;