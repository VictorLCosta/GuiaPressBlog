const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const slugify = require('slugify');

router.get('/admin/categories/register', (req, res) => 
{
    res.render('admin/categories/register')
});

router.post('/categories/save', (req, res) => 
{
    var title = req.body.title;
    if(title != undefined)
    {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/');
        });
    }
    else
    {
        res.redirect('/admin/categories/register');
    }
});

router.get('/admin/categories', (req, res) => 
{
    var categories = Category.findAll({raw: true}).then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        });
    });
});

router.post('/admin/categories/delete', (req, res) => 
{
    var id = req.body.id;

    if(id != undefined)
    {
        if(!isNaN(id))
        {
            Category.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            });
        }else{
            res.redirect('/admin/categories');
        }
    }else{
        res.redirect('/admin/categories');
    }
});

router.get('/admin/categories/edit/:id', (req, res) => 
{
    var id = req.params.id

    if(isNaN(id))
    {
        res.redirect('/admin/categories');
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render('admin/categories/edit', {category: category});
        }else{
            res.redirect('/admin/categories');
        }
    }).catch(error => {
        res.redirect(res.redirect('/admin/categories'));
    });
});

module.exports = router;