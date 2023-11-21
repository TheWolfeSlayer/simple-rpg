const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    gold: {
        type: Number,
        required: true
    },
    equipment: {
        type: Array
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)