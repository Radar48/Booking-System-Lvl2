import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './userModel.js';
import Event from './eventModel.js';

const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    qr_code: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('booked', 'cancelled', 'used'), defaultValue: 'booked' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

// Relationships
Ticket.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Ticket, { foreignKey: 'user_id', as: 'tickets' });

Ticket.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
Event.hasMany(Ticket, { foreignKey: 'event_id', as: 'tickets' });

export default Ticket;