const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

router.get('/admin/users', (req, res) => 
{
    User.findAll().then(users => {
        res.render('');
    });
});

router.get('/admin/users/create', (req, res) => 
{
    res.render('admin/users/create');
});

router.post('/admin/users/save', (req, res) => 
{
    var email = req.body.email;
    var userName = req.body.userName;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then(user => {
        if(user == undefined)
        {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                userName: userName,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                res.redirect('/admin/users/create');
            });
        }
        else
        {
            res.redirect('/admin/users/create');
        }
    });
});

module.exports = router;