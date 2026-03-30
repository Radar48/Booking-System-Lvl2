import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './userModel.js';
import Event from './eventModel.js';
import Ticket from './ticketModel.js';

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'success', 'failed'), defaultValue: 'pending' },
    payment_method: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false
});

// Relationships
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });

Payment.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
Event.hasMany(Payment, { foreignKey: 'event_id', as: 'payments' });

Payment.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
Ticket.hasOne(Payment, { foreignKey: 'ticket_id', as: 'payment' });

export default Payment;