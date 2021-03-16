const Sequelize = require('sequelize');
const cnn = require('../database/context');

const User = cnn.define('users', 
{   email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: null
    }
});

module.exports = User;