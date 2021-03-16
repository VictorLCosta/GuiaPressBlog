const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/admin/users', (req, res) => 
{
    res.send('<h1>O usuário é gay</h1>');
});

router.get('/admin/users/create', (req, res) => 
{
    res.render('admin/users/create');
});

module.exports = router;