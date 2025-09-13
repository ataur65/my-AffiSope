const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/register', authController.createUser); // This route will need admin protection
router.get('/users', authController.getAllUsers); // New route to get all users
router.put('/change-password', authController.changePassword); // New route to change password
router.delete('/users/:id', authController.deleteUser); // New route to delete a user

module.exports = router;