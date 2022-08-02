let express = require('express');
const Item = require('../models/items');
let router = express.Router();
const inputValidation = require("../middleware/passengerInputValidation");


// Show all lost items 
router.get("/showItems", async (req, res) => {
    try {
        const allItems = await Item.find();
        res.status(200).json(allItems);
    } catch (err) {
        res.status(400).json({ message: "Error fetching database" })
    }
})

// Show one item [in case the need for see more details]
router.get("/showItems/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleItem = await Item.findById(id);
        res.status(200).json(singleItem);
    } catch (err) {
        res.status(400).json({ message: "Error fetching database" });
    }
})

// Show items by search [searching by inputs of keyWords and lostTime and show all matched items]
router.get("/search", inputValidation, async (req, res) => {
    try {
        const { keyWords, lostTimeSince, lostTimeUntil } = req.body;
        const lowerCaseKeyWords = keyWords.toLowerCase().split(" ");
        const timeSince = `${lostTimeSince}:00.000Z`
        const timeUntil = `${lostTimeUntil}:00.000Z`
        console.log(timeSince)
        const searchItem = await Item.find(
            {
                $or: [
                    { typeOfProduct: lowerCaseKeyWords },
                    { brand: lowerCaseKeyWords },
                    { color: lowerCaseKeyWords },
                    { description: lowerCaseKeyWords },
                ],
                $and: [
                    { lostDate: { $gte:ISODate(timeSince) , $lte:ISODate(timeUntil) }}
                ],
            }
        )
        if (searchItem.length === 0) {
            res.status(204).json({ message: "No items founded" })
        } else {
            res.status(200).json(searchItem);
        }
    } catch (err) {
        res.status(400).json({ message: "Error fetching database" });
    }
})

module.exports = router;
