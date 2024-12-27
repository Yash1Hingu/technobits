'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trime: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
    }
}, {
    timestamps: true
});

// Hash plain Password.
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});


// Login the user
userSchema.statics.findByCredials = async(email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Unable to log in');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to log in');
    }

    return user;
}

const User = mongoose.model('user',userSchema);
module.exports = User;