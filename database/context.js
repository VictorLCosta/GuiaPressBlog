const Sequelize = require('sequelize');

const cnn = new Sequelize('guiapressappdb', 'root', 'Icaronon9', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = cnn;