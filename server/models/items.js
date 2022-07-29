const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    typeOfProduct: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    lostDate: {
        type: Date,
        max: Date.now()
    },
},
    { timestamps: true },
)

let Item = mongoose.model('items', itemSchema);

module.exports = Item;
