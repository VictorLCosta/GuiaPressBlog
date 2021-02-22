const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Article = require('../models/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
    res.send('Rota de artigos');
});

router.get('/admin/articles/new', (req, res) =>
{
    Category.findAll({raw: true}).then(categories => {
        res.render('admin/articles/register', {
            categories: categories
        });
    });
});

router.post('/admin/articles/save', (req, res) => 
{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: category
    }).then(() => {
        res.redirect('/');
    });
});

module.exports = router;