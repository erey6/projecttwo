const express = require('express')
const coffees = express.Router()
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}


const gradeList = ['', 'F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+']

//Schema
const User = require('../models/users.js')
const Coffee = require('../models/coffees.js')
const coffeeSeed = require('../models/coffeeSeed.js')

//HOME

coffees.get('/home', (req, res) => {
    Coffee.find({}, (err, allCoffees) => {
        res.render('coffees/home.ejs', {
            coffees: allCoffees.reverse(),
            currentUser: req.session.currentUser,
            grades: gradeList
        })
    })

})
//INDEX
coffees.get('/', (req, res) => {
    //grade stores numbef before $gte conversion --NOTE: nums will be strings
    const grade = req.query.grade;
    
    //for filtering on index.ejs, if price is empty, it removes from query
    (req.query.price === '') ? delete req.query.price : null;
    (req.query.grade === '') ? delete req.query.grade : null;
    (req.query.favorite === 'on') ? req.query.favorite = true : null;
    (req.query.grade) ? req.query.grade = { $gte: req.query.grade } : null;
    Coffee.find(req.query, (err, allCoffees) => {
        // console.log(allCoffees)
        console.log('here', allCoffees)
        if (err) {
            console.log(err)
        } else {
            res.render('coffees/index.ejs', {
                userPage: false,
                currentUser: req.session.currentUser,
                coffees: allCoffees.reverse(),
                grades: gradeList,
                query: req.query,
                grade: grade,
            })
        }
    })

})

//only USER COFFEES
//INDEX
coffees.get('/usercoffees', isAuthenticated, (req, res) => {
    User.findById(req.session.currentUser._id, (err, userData) => {
        console.log('apple')
        if (err) {
            console.log(err)
        } else {
            res.render('coffees/index.ejs', {
                userPage: true,
                currentUser: req.session.currentUser,
                coffees: userData.coffees.reverse(),
                grades: gradeList,
            })
        }
    })

})


//NEW
coffees.get('/new', (req, res) => {
    res.render('coffees/new.ejs', {
        currentUser: req.session.currentUser
    })
})

//SHOW
coffees.get('/:id', (req, res) => {
    Coffee.findById(req.params.id, (err, foundCoffee) => {
        // console.log('found here', foundCoffee)
        foundCoffee.letterGrade = gradeList[foundCoffee.grade];
        (foundCoffee.home === true) ? foundCoffee.where = 'home' : foundCoffee.where = 'cafe';
        res.render('coffees/show.ejs', {
            currentUser: req.session.currentUser,
            coffee: foundCoffee,

        })
    })
})

//EDIT
coffees.get('/:id/edit', isAuthenticated, (req, res) => {
    Coffee.findById(req.params.id, (err, foundCoffee) => {
        User.findOne({ 'coffees._id': req.params.id }, (err, foundUser) => {
            let editor
           if (foundUser.id===req.session.currentUser._id) 
           {
               editor = true 
            } else {
                editor = false
            };
            res.render('coffees/edit.ejs', {
                currentUser: req.session.currentUser,
                coffee: foundCoffee,
                canEdit: editor
            })
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
    Coffee.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updated) => {
        User.findOne({ 'coffees._id': req.params.id }, (err, foundUser) => {
            foundUser.coffees.id(req.params.id).remove();
            foundUser.coffees.push(updated);
            foundUser.save((err, data) => {
                res.redirect(`/coffees/${req.params.id}`)
            })
        })
    })
})

//CREATE
coffees.post('/', isAuthenticated, (req, res) => {
    //assigns true or false for the two radio button params and checkbox
    (req.body.home === 'home') ? req.body.home = true : req.body.home = false;
    (req.body.wholeBean === 'wholeBean') ? req.body.wholeBean = true : req.body.wholeBean = false;
    (req.body.favorite === 'on') ? req.body.favorite = true : req.body.favorite = false;
    //parse strings to nums for price, grade
    req.body.price = parseInt(req.body.price)
    req.body.grade = parseInt(req.body.grade)
    //turns String of tags into array
    req.body.tags = req.body.tags.split(',')
    User.findById(req.session.currentUser, (err, foundUser) => {
        Coffee.create(req.body, (err, addedCoffee) => {
            if (err) {
                res.send(error);
            } else {
                foundUser.coffees.push(addedCoffee);
                foundUser.save((err, data) => {
                    res.redirect('/coffees/usercoffees')
                })

            }
        })
    })

})

//DELETE
coffees.delete('/:id', isAuthenticated, (req, res) => {
    Coffee.findByIdAndDelete(req.params.id, (err, data) => {
        User.findOne({ 'coffees._id': req.params.id }, (err, foundUser) => {
            foundUser.coffees.id(req.params.id).remove();
            foundUser.save((err, data) => {
                // console.log('updated user', data)
                res.redirect('/coffees')
            })
        })

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