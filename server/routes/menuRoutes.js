const express = require('express');
const router = express.Router();
const { getMenuItems, getMenuItem } = require('../controllers/menuController');

console.log('Menu routes loaded:', { getMenuItems, getMenuItem });

router.get('/', getMenuItems);
router.get('/:id', getMenuItem);

module.exports = router;
