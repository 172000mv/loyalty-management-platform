const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const transactionController = require('../controllers/transactionController');
const pointsController = require('../controllers/pointsController');
const membersController = require('../controllers/membersController');
const authenticateToken = require('../middlewares/auth');

// Admin routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Transaction routes
router.post('/transactions',  transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);

// Points routes
router.post('/points', pointsController.updatePoints);

// Members routes
router.get('/members', membersController.getMembers);
router.post('/addmember', membersController.addMembers);

module.exports = router;
