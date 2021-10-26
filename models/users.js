const mongoose = require('mongoose');
const Coffee = require('../models/coffees.js')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: String,
    password: String,
    coffees: [Coffee.schema]
   
});

const User= mongoose.model('User', userSchema);

module.exports = User;