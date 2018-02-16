/**
 * @class Database
 * @author Michael Cao
 * @description Useful database functions
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize('tie', 'tie', 'burger1', { // eslint-disable-line no-unused-vars
  dialect: 'postgres'
});

exports.initialize = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};