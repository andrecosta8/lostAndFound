let express = require('express');
const Item = require('../models/items');
// const User = require('../models/users');
let router = express.Router();



// Create new item
router.post("/admin/newItem", async (req, res) => {
    try {
        const { typeOfProduct, brand, color, description, lostDate } = req.body;
        const newItem = new Item({
            typeOfProduct,
            brand,
            color,
            description,
            lostDate,
            // createdBy: User._id,
        });
        await newItem.save();
        res.status(200).json({ message: "Succesfully created item" })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong, please repeat" })
    }
})


module.exports = router;
