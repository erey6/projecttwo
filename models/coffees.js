const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    roaster: {type: String, required: true},
    name: String,
    wholeBean: Boolean,
    tags: [String],
    description: String,
    home: Boolean,
    address: String,
    favorite: Boolean,
    price: { type: Number, min: 1, max: 4 },
    grade: { type: Number, min: 0, max: 13 },
    img: String,
});


const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;