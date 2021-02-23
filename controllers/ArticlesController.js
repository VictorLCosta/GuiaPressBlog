const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Article = require('../models/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
    Article.findAll({include: [{model: Category, required: true}]}).then(articles => {
        res.render('admin/articles', {
            articles: articles
        });
    });
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
        res.redirect('admin/articles');
    });
});

router.post('/admin/articles/delete', (req, res) => 
{
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles');
            });
        }
        else{
            res.redirect('/admin/articles');
        }
    }
    else{
        res.redirect('/admin/articles');
    }
});

module.exports = router;