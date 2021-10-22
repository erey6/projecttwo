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
//INDEX
coffees.get('/', (req, res) => {
    Coffee.find({}, (err, allCoffees) => {
        res.render('coffees/index.ejs', {
            coffees: allCoffees
        })
    })

})

//SHOW
coffees.get('/:id', (req, res) => {
    Coffee.find({}, (err1, allCoffees) => {
        Coffee.findById(req.params.id, (err, foundCoffee) => {
            (foundCoffee.wholeBean === true) ? foundCoffee.bean = 'Whole bean' : foundCoffee.bean = 'Ground';
            (foundCoffee.home === true) ? foundCoffee.where = 'home' : foundCoffee.where = 'cafe';
            res.render('coffees/show.ejs', {
                coffee: foundCoffee,
                coffees: allCoffees
            })
        })
    })
})

//EDIT
coffees.get('/:id/edit', (req, res) => {
    Coffee.findById(req.params.id, (err, foundCoffee) => {
        res.render('coffees/edit.ejs', {
            coffee: foundCoffee
        })
    })
})

//UPDATE
coffees.put('/:id', (req, res) => {
    //assigns true or false for the two radio button params
    (req.body.home==='home') ? req.body.home = true : req.body.home = false;
    (req.body.wholeBean==='wholeBean') ? req.body.wholeBean = true : req.body.wholeBean = false;
    //parse strings to nums for price, grade
    req.body.price = parseInt(req.body.price)
    req.body.grade = parseInt(req.body.grade)
    //turns String of tags into array
    req.body.tags = req.body.tags.split(',')
    Coffee.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
        res.redirect('/coffees')
    })
})  




// Seed route
// coffees.get('/seed', (req, res) => {
//     Coffee.create(coffeeSeed, (error, seed) => {
//         if (error) {
//             console.log(error)
//         } else {
//             res.send('<a href="/coffees/home">seeded </a>')
//         }
//     })
// })




module.exports = coffees