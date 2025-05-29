const express = require('express');
const router = express.Router();
const itemController = require('../controller/ControllerDestinasi');

// Create
router.post('/', itemController.createItem);

// Read all
router.get('/', itemController.getAllItems);

// Read by ID
router.get('/:id', itemController.getItemById);

// Update
router.put('/:id', itemController.updateItem);

// Delete
router.delete('/:id', itemController.deleteItem);

// Search
router.get('/search/:keyword', itemController.searchItems);

module.exports = router;