/**
* App routes definitions.
*/
'use strict';

let express = require('express');
const Item = require('../models/items');
let router = express.Router();

// To confirm setup only.
router.get('/', function (req, res) { return res.send('Find your lost items here!!'); });
router.use(require("./adminRoutes"));


// Show all lost items 
router.get("/showItems", async (req, res) => {
    try {
        const allItems = await Item.find();
        res.status(200).json(allItems);
    } catch (err) {
        res.status(400).json({ message: "Error fetching database" })
    }
})

// Show one item 
router.get("/showItems/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleItem = await Item.findById(id);
        res.status(200).json(singleItem);
    } catch (err) {
        res.status(400).json({ message: "Error fetching database" });
    }
})

// Show items by search
router.get("/search", async (req, res) => {
    try {
        const { keyWords } = req.body;
        const lowerCaseKeyWords = keyWords.toLowerCase();
        const searchItem = await Item.find(
            {$or:[
                {typeOfProduct: lowerCaseKeyWords},
                {brand: lowerCaseKeyWords},
                {color: lowerCaseKeyWords},
                {description: lowerCaseKeyWords},
            ]}  
        )
        res.status(200).json(searchItem);
    } catch (err) {
        res.status(400).json({ message: "Error fetching database" });
    }
})

module.exports = router;
