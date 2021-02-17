const Sequelize = require('sequelize');
const cnn = require('../database/context');
const Category = require('./Category')

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

Category.hasMany(Article);
Article.belongsTo(Category);

module.exports = Article;