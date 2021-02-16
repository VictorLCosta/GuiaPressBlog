const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
    res.send('Tua tia na minha vara');
});

router.get('/categories/findall', (req, res) => {

});

module.exports = router;