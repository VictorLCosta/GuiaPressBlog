const express = require('express');
const router = express.Router();

router.get('/admin/categories/register', (req, res) => 
{
    res.render('admin/categories/register')
});

module.exports = router;