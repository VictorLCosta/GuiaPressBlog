const express = require('express');
const router = express.Router();

router.get('/admin/articles', (req, res) => {
    res.send('Rota de artigos');
});

router.get('/admin/articles/new', (req, res) =>
{
    res.render('admin/articles/register');
});

module.exports = router;