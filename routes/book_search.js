const router = require('express').Router();
let Inventory = require('../models/inventory_model');
let Account = require('../models/account_model');

//Render the Book Search Page with all books data.
router.route('/').get(async (req, res) => {
    try {
        const books = await Inventory.find({})
        const customer = await Account.findById(req.userID);
        res.render("customer/main", { customer, books });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Inventory Page with filtered book data.
router.route('/').post(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);

        const getPriceRange = (option) => {
            switch (option) {
                case 'range1':
                    return { $gte: 0, $lte: 10 };
                case 'range2':
                    return { $gt: 10, $lte: 20 };
                case 'range3':
                    return { $gt: 20, $lte: 30 };
                default:
                    return {}; // Default case or empty object if no specific range is selected
            }
        };

        let query = {};

        if (req.body.titleQuery) {
            query.book_title = { $regex: new RegExp(req.body.titleQuery, 'i') };
        }

        if (req.body.authorQuery !== 'Author') {
            query.author = req.body.authorQuery;
        }

        if (req.body.genreQuery !== 'Genre') {
            query.genre = req.body.genreQuery;
        }

        if (req.body.priceQuery !== 'Price') {
            const priceRangeQuery = getPriceRange(req.body.priceQuery);
            if (Object.keys(priceRangeQuery).length !== 0) {
                query.price = priceRangeQuery;
            }
        }

        const books = await Inventory.find(query);

        res.render('customer/main', { customer, books });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Book Deatil Page with book data 
router.route('/:book_ID').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const book = await Inventory.findById(req.params.book_ID);
        res.render('customer/book-detail', { customer, book });
    } catch (err) {
        console.log(err.message);
    }
});
module.exports = router;