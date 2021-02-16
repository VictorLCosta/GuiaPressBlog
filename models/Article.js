const Sequelize = require('sequelize');
const cnn = require('../database/context');

const Article = cnn.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Article;