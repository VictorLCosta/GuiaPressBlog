const Sequelize = require('sequelize');

const cnn = new Sequelize('guiapressappdb', 'root', 'Icaronon9', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = cnn;