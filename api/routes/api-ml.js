const express = require('express');
const router = express.Router();

const mlCtrl = require('../controllers/ml.controller');

router.post('/', mlCtrl.test);
router.get('/:id', mlCtrl.getId);
router.get('/', mlCtrl.searchQueryP);


module.exports = router;