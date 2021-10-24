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

//NEW
coffees.get('/new', (req, res) => {
    res.render('coffees/new.ejs')
})

//SHOW
coffees.get('/:id', (req, res) => {
    Coffee.find({}, (err1, allCoffees) => {
        Coffee.findById(req.params.id, (err, foundCoffee) => {
            const gradeList = ['', 'F', 'D-','D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+']
            foundCoffee.letterGrade = gradeList[foundCoffee.grade];
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
    //assigns true or false for the two radio button params and checkbox
    (req.body.home === 'home') ? req.body.home = true : req.body.home = false;
    (req.body.wholeBean === 'wholeBean') ? req.body.wholeBean = true : req.body.wholeBean = false;
    (req.body.favorite === 'on') ? req.body.favorite = true : req.body.favorite = false;
    //parse strings to nums for price, grade
    req.body.price = parseInt(req.body.price)
    req.body.grade = parseInt(req.body.grade)
    //turns String of tags into array
    req.body.tags = req.body.tags.split(',')
    Coffee.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
        res.redirect('/coffees')
    })
})

//CREATE
coffees.post('/', (req, res) => {
    //assigns true or false for the two radio button params and checkbox
    (req.body.home === 'home') ? req.body.home = true : req.body.home = false;
    (req.body.wholeBean === 'wholeBean') ? req.body.wholeBean = true : req.body.wholeBean = false;
    (req.body.favorite === 'on') ? req.body.favorite = true : req.body.favorite = false;
    //parse strings to nums for price, grade
    req.body.price = parseInt(req.body.price)
    req.body.grade = parseInt(req.body.grade)
    //turns String of tags into array
    req.body.tags = req.body.tags.split(',')
    Coffee.create(req.body, (err, addedCoffee) => {
        if (err) {
            res.send(error);
        } else {
        res.redirect('/coffees')
        }
    })
})

//DELETE
coffees.delete('/:id', (req, res) => {
    Coffee.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/coffees')
    })
})



// Seed route
coffees.get('/seed/seed', (req, res) => {
    Coffee.create(coffeeSeed, (error, seed) => {
        if (error) {
            console.log(error)
        } else {
            res.send('<a href="/coffees/home">seeded </a>')
        }
    })
})




module.exports = coffees