const router = require('express').Router();
let Inventory = require('../models/inventory_model');
let Account = require('../models/account_model');
let Order = require('../models/order_model');

//Render the Dashboard Page.
router.route('/').get(async (req, res) => {
    try {
        const books = await Inventory.find({});
        const owner = await Account.findById(req.userID);
        const genres = await Inventory.distinct('genre');
        const authors = await Inventory.distinct('author');

        res.render('owner/dashboard', { books, owner, genres, authors });
    } catch (err) {
        console.log(err.message);
    }
});


module.exports = router;