let express = require('express');
const Item = require('../models/items');
let router = express.Router();
const itemValidation = require("../middleware/newItemValidation");


// Create new item
router.post("/admin/newItem", itemValidation, async (req, res) => {
    const { typeOfProduct, brand, color, description, lostDate } = req.body;
    try {
        const newItem = new Item({
            typeOfProduct,
            brand,
            color,
            description,
            lostDate,
        });
        await newItem.save();
        res.status(201).json({ message: "Succesfully created item" })
    } catch (err) {
        res.status(400).json({ message: "Error creating item" })
    }
})

// Delete item 
router.delete("/admin/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(204).json({ message: "Item deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting item" })
    }
})


module.exports = router;
