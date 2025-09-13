
const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menuitems
// @access  Public
exports.getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find();

    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new menu item
// @route   POST /api/menuitems
// @access  Private
exports.createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.create(req.body);

    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update menu item
// @route   PUT /api/menuitems/:id
// @access  Private
exports.updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menuitems/:id
// @access  Private
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Add sub-menu item
// @route   POST /api/menuitems/submenu
// @access  Private
exports.addSubMenuItem = async (req, res, next) => {
  try {
    const { parentId, childName, childPage } = req.body;

    const menuItem = await MenuItem.findById(parentId);

    if (!menuItem) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }

    menuItem.children.push({
      name: childName,
      page: childPage,
    });

    await menuItem.save();

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete sub-menu item by name
// @route   DELETE /api/menuitems/submenu/:name
// @access  Private
exports.deleteSubMenuItemByName = async (req, res, next) => {
  try {
    // Logic to delete sub-menu item by name
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
