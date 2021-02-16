const Sequelize = require('sequelize');
const cnn = require('../database/context');

const Category = cnn.define('categories', 
{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;