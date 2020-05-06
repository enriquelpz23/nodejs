const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete_sequelize', 'root', 'nq7bCMJq3LmzZx', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
