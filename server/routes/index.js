/**
* App routes definitions.
*/
'use strict';

let express = require('express');
let router = express.Router();


// ROUTES
// Homepage
router.get('/', function (req, res) { return res.send('Find your lost items here!'); });
// admin routes for CRUD items
router.use(require("./adminRoutes"));
// Passenger routes for Search by keywords and for lost time
router.use(require("./passengerRoutes"))


module.exports = router;
