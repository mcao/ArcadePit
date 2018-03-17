/**
 * @class Database
 * @author Michael Cao
 * @description Useful database functions
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize('tie', 'tie', 'burger1', { // eslint-disable-line no-unused-vars
  dialect: 'postgres'
});

const Events = sequelize.define('events', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  creator: { type: Sequelize.STRING, allowNull: false },
  time: { type: Sequelize.DATE, allowNull: false, unique: true },
  timed: { type: Sequelize.BOOLEAN },
  participants: { type: Sequelize.ARRAY({ type: Sequelize.STRING }) },
  standings: { type: Sequelize.ARRAY({ type: Sequelize.STRING }) },
  timeStarted: { type: Sequelize.DATE },
  timeEnded: { type: Sequelize.DATE },
  started: { type: Sequelize.BOOLEAN },
  ended: { type: Sequelize.BOOLEAN },
  lastReminderSent: { type: Sequelize.INTEGER },
  open: { type: Sequelize.BOOLEAN },
  forciblyEnded: { type: Sequelize.BOOLEAN }
});

exports.Events = Events;

exports.initialize = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  sequelize
    .sync()
    .then(() => {
      console.log('Database Synchronized.');
    })
    .catch(err => {
      console.error('Unable to synchronize with the database:', err);
    });
};

exports.create = (data) => {
  if (!data) throw new TypeError('Cannot create an event without data!');
  if (!data.name) throw new TypeError('Cannot create an event without a name!');
  if (!data.creator) throw new TypeError('Cannot create an event without a creator (User ID)!');
  if (!data.time) throw new TypeError('Cannot create an event without a time (timestamp)!');
  if (!data.timed) throw new TypeError('Cannot create an event without knowing whether it\'s timed!');

  return Events.create({
    name: data.name,
    creator: data.creator,
    time: data.time,
    participants: [],
    standings: [],
    started: false,
    ended: false,
    lastReminderSent: 0,
    open: false,
    forciblyEnded: false
  });
};