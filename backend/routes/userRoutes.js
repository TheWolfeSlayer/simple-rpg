const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getMe,
    updateUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', updateUser)

module.exports = router