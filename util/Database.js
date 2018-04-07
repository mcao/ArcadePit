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
  participants: { type: Sequelize.JSON },
  standings: { type: Sequelize.ARRAY({ type: Sequelize.STRING }) },
  timeStarted: { type: Sequelize.DATE },
  timeEnded: { type: Sequelize.DATE },
  started: { type: Sequelize.BOOLEAN },
  ended: { type: Sequelize.BOOLEAN },
  lastReminderSent: { type: Sequelize.INTEGER },
  open: { type: Sequelize.BOOLEAN },
  forciblyEnded: { type: Sequelize.BOOLEAN },
}, {
  getterMethods: {
    externalID: function() { return this.id % 100; }
  }
});

async function getEvent(nameOrID) {
  if (!isNaN(nameOrID)) {
    var events = await Events.findAll({ where: { ended: false } });
    events.forEach(event => {
      console.log(event.externalID);
      if (event.externalID == Number(nameOrID)) return event;
    });
    return null;
  } else {
    return await Events.findOne({ where: { name: nameOrID, ended: false } });
  }
}

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
  if (data.timed == undefined) throw new TypeError('Cannot create an event without knowing whether it\'s timed!');

  return Events.create({
    name: data.name,
    creator: data.creator,
    time: data.time,
    timed: data.timed,
    participants: {},
    standings: [],
    started: false,
    ended: false,
    lastReminderSent: 0,
    open: false,
    forciblyEnded: false
  });
};

exports.add = async (user, eventName) => {
  var event = await getEvent(eventName);
  if (event && event.open) {
    var participants = event.participants || {};

    if (!participants[user.id]) {
      participants[user.id] = {
        ready: false,
        started: false,
        finished: false,
        time: 0
      };
      await Events.update({
        participants: participants
      }, {
        where: { id: event.id }
      });
      return 'successfully added ' + user.username + ' to the ' + event.name + ' race!';
    } else {
      return user.username + ' is already in this race!';
    }
  } else if (event && !event.open) {
    return 'that event is not open yet!';
  } else {
    return 'event not found!';
  }
};
