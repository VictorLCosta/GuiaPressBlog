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

module.exports = router;