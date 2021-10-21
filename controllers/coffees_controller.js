const express = require('express')
const coffees = express.Router()

//Schema
const Coffee = require('../models/coffees.js')
const coffeeSeed = require('../models/coffeeSeed.js')

//HOME

coffees.get('/home', (req, res) => {
    Coffee.find({}, (err, allCoffees) => {
        res.render('coffees/home.ejs', {
            coffees: allCoffees
        })
    })
    
})





// Seed route
coffees.get('/seed', (req, res) => {
    Coffee.create(coffeeSeed, (error, seed) => {
        if (error) {
            console.log(error)
        } else {
            res.send('<a href="/coffees/home">seeded </a>')
        }
    })
})




module.exports = coffees