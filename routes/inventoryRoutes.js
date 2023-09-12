const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { creatInventoryController, getInventoryController } = require('../controllers/inventoryController')

const router = express.Router()

// Router
// Add inventory || Post

router.post('/create-inventory', authMiddleware, creatInventoryController)


// GET ALL Blood Records
router.get('/get-inventory', authMiddleware, getInventoryController)

module.exports = router