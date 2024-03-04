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
    details : {
        MaxHealth: { type: Number },
        Health : { type: Number },
        Level: { type: Number },
        Experience: { type: Number },
        NeededExperience: { type: Number}
    },
    stats : {
        Attack : { type: Number},
        Defense : { type: Number },
        Sword: { type: String },
        Armor: { type: String },
        Area : { type: Number },
        TimeTravels: { type: Number },
    },
    inventory : { 
        Gold : { type: Number },
        Wood : { type: Number },
        Fish : { type: Number },
        Apple : { type: Number },
        Ruby : { type: Number }
     }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)