const express = require('express')
const coffees = express.Router()

//HOME

coffees.get('/home', (req, res) => {
    res.render('coffees/home.ejs')
})






module.exports = coffees