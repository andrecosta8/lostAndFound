/**
* App routes definitions.
*/
'use strict';

let express = require('express');
const Item = require('../models/items');
let router = express.Router();

// To confirm setup only.
router.get('/', function(req, res) { return res.send('Hello world!'); });
router.use(require("./adminRoutes"));


// show all lost items 
router.get("/showItems", async (req, res) => {
    try{
        const allItems = await Item.find();
        res.json(allItems);
    }catch(err){
        res.status(400).json({message:"No items to show"})
    }
})

module.exports = router;
