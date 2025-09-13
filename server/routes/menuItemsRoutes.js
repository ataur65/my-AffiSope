const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, addSubMenuItem, deleteSubMenuItemByName } = require('../controllers/menuItemsController');

router.route('/')
  .get(getMenuItems)
  .post(createMenuItem);

router.route('/:id')
  .put(updateMenuItem)
  .delete(deleteMenuItem);

router.route('/submenu')
  .post(addSubMenuItem);

router.route('/submenu/:name')
  .delete(deleteSubMenuItemByName);

module.exports = router;