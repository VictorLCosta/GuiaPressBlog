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

router.get('/admin/articles/update/:id', (req, res) => 
{
    var id = req.params.id;
    if(id != undefined){
        Article.findOne({
            include: [{model: Category}],
            where: {
                id: id
            }
        }).then(article => {
            Category.findAll({raw: true}).then(categories => {
                res.render('admin/articles/update', {
                    article: article,
                    category: article.category,
                    categories: categories
                });
            });
        });
    }else{
        res.status(400);
        res.send('Bad request');
    }
});

router.post('/admin/articles/edit', (req, res) => 
{
    var id = req.body.id;
    var body = req.body.body;
    var title = req.body.title;
    var categoryId = req.body.category;

    Article.update({
        title: title,
        categoryId: categoryId,
        body: body
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/articles');
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
        res.redirect('/admin/articles');
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

router.get('/articles/page/:num', (req, res) => 
{
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1)
    {
        offset = 0;
    }
    else
    {
        offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles => {
        var next;
        if(offset + 4 >= articles.count)
        {
            next = false;
        }
        else
        {
            next = true;
        }

        var result = {
            next: next,
            articles: articles,
            page: parseInt(page)
        }
        
        Category.findAll().then(categories => {
            res.render('admin/articles/page', {
                result: result,
                categories: categories,
            });
        });
    });
});

module.exports = router;