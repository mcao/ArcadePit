/**
 * @class Database
 * @author Michael Cao
 * @description Useful database functions
 */

const config = require("../config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.pass,
  {
    // eslint-disable-line no-unused-vars
    dialect: "postgres"
  }
);

const Events = sequelize.define(
  "events",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    creator: {
      type: Sequelize.STRING,
      allowNull: false
    },
    time: {
      type: Sequelize.DATE,
      allowNull: false,
      unique: true
    },
    timed: {
      type: Sequelize.BOOLEAN
    },
    participants: {
      type: Sequelize.JSON
    },
    standings: {
      type: Sequelize.ARRAY({
        type: Sequelize.STRING
      })
    },
    timeStarted: {
      type: Sequelize.DATE
    },
    timeEnded: {
      type: Sequelize.DATE
    },
    started: {
      type: Sequelize.BOOLEAN
    },
    ended: {
      type: Sequelize.BOOLEAN
    },
    lastReminderSent: {
      type: Sequelize.INTEGER
    },
    open: {
      type: Sequelize.BOOLEAN
    },
    forciblyEnded: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    getterMethods: {
      externalID: function() {
        return this.id % 100;
      }
    }
  }
);

exports.Events = Events;

async function getEvent(nameOrID) {
  if (!isNaN(nameOrID)) {
    var events = await Events.findAll({
      where: {
        ended: false
      }
    });
    for (var i = 0; i < events.length; i++) {
      if (events[i].externalID === Number(nameOrID)) {
        return await Events.findOne({
          where: {
            id: events[i].id
          }
        });
      }
    }
  } else {
    return await Events.findOne({
      where: {
        name: nameOrID,
        ended: false
      }
    });
  }
}

exports.getEvent = async eventName => {
  return getEvent(eventName);
};

exports.initialize = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  sequelize
    .sync()
    .then(() => {
      console.log("Database Synchronized.");
    })
    .catch(err => {
      console.error("Unable to synchronize with the database:", err);
    });
};

exports.create = data => {
  if (!data) throw new TypeError("Cannot create an event without data!");
  if (!data.name) throw new TypeError("Cannot create an event without a name!");
  if (!data.creator)
    throw new TypeError("Cannot create an event without a creator (User ID)!");
  if (!data.time)
    throw new TypeError("Cannot create an event without a time (timestamp)!");
  if (data.timed == undefined)
    throw new TypeError(
      "Cannot create an event without knowing whether it's timed!"
    );

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
  if (event) {
    var participants = event.participants || {};

    if (!participants[user.id]) {
      participants[user.id] = {
        ready: false,
        started: false,
        finished: false,
        time: 0,
        score: 0
      };
      await Events.update(
        {
          participants: participants
        },
        {
          where: {
            id: event.id
          }
        }
      );
    } else {
      throw new Error("Error: This racer is already in the race!");
    }
  } else {
    throw new Error("Error: This race does not exist!");
  }
};

exports.remove = async (user, eventName) => {
  var event = await getEvent(eventName);
  if (event) {
    var participants = event.participants || {};

    if (participants[user.id]) {
      delete participants[user.id];
      await Events.update(
        {
          participants: participants
        },
        {
          where: {
            id: event.id
          }
        }
      );
    } else {
      throw new Error("Error: This racer is not in the race!");
    }
  } else {
    throw new Error("Error: This race does not exist!");
  }
};

exports.removeAll = async user => {
  var events = await Events.findAll({
    where: {
      started: false,
      ended: false
    }
  });

  for (var i = 0; i < events.length; i++) {
    var participants = events[i].participants || {};

    if (participants[user.id]) {
      delete participants[user.id];
      await Events.update(
        {
          participants: participants
        },
        {
          where: {
            id: events[i].id
          }
        }
      );
    }
  }
};

exports.cancel = async eventName => {
  var event = await getEvent(eventName);

  if (event && !event.started) {
    await Events.update(
      {
        started: true,
        ended: true,
        open: false,
        forciblyEnded: true
      },
      {
        where: {
          id: event.id
        }
      }
    );
  } else if (event && event.started) {
    throw new Error("Error: This race has already began!");
  } else {
    throw new Error("Error: This race does not exist!");
  }
};

exports.delete = async eventName => {
  var event = await getEvent(eventName);
  await Events.destroy({
    where: {
      id: event.id
    }
  });
};

exports.sync = async event => {
  await Events.update(event.dataValues, {
    where: {
      id: event.id
    }
  });
};

exports.getFutureEvents = async () => {
  return Events.findAll({
    where: {
      started: false
    }
  });
};

exports.setLastReminder = async (lastReminder, eventID) => {
  await Events.update(
    {
      lastReminderSent: lastReminder
    },
    {
      where: {
        id: eventID
      }
    }
  );
};

exports.openEvent = async eventID => {
  await Events.update(
    {
      open: true
    },
    {
      where: {
        id: eventID
      }
    }
  );
};
