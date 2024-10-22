const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req,res) => {
    const { username, email, password } = req.body
    console.log(username)

    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        details: { 
            MaxHealth: 100,
            Health: 100,
            Level: 1,
            Experience: 0,
            NeededExperience: 100,
        },
        stats: {
            Attack : 10,
            Defense : 10,
            Sword: "none",
            Armor: "none",
            Area : 1,
            TimeTravels: 0
        },
        inventory: {
            Gold: 0,
            Wood: 0,
            Fish: 0,
            Apple: 0,
            Ruby: 0
        }
    })
    console.log(user)
    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            details: user.details,
            stats: user.stats,
            inventory: user.inventory,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    
    // Check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            details: user.details,
            stats: user.stats,
            inventory: user.inventory,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// @desc    Updates user details
// @route   POST /api/user/details
// @access  Public
const updateUser = asyncHandler(async (req,res) => {
    const { email, details, stats, inventory } = req.body
    await User.findOneAndUpdate({ email }, { details, stats, inventory })
    const user = await User.findOne({ email })
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        details: user.details,
        stats: user.stats,
        inventory: user.inventory,
        token: generateToken(user._id)
    })
})

// @desc    Get user data
// @route   GET /api/user/me
// @access  Private
const getMe = asyncHandler(async (req,res) => {
    const { _id, username, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        username,
        email,
        details,
        stats,
        inventory
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = { 
    registerUser,
    loginUser,
    getMe,
    updateUser
}