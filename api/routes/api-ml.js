const express = require('express');
const router = express.Router();

const mlCtrl = require('../controllers/ml.controller');

router.get('/items/:id', mlCtrl.getId);
router.get('/items/', mlCtrl.searchQueryP);


module.exports = router;