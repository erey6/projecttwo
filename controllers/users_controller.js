const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
    res.send('time to set up a users')
    // res.render('users/new.ejs')
})


module.exports = users