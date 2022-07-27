const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type_of_product: {
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
        required: true
    },
    lostDate: {
        type: Date,
        max: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    timestamps: true 
})

let Item = mongoose.model('items', itemSchema);

module.exports = Item;
