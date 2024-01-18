const router = require('express').Router();
let Inventory = require('../models/inventory_model');
let Account = require('../models/account_model');
let Order = require('../models/order_model');

//Render the Book Search Page with all books data.
router.route('/').get(async (req, res) => {
    try {
        const books = await Inventory.find({})
        const customer = await Account.findById(req.userID);
        const genres = await Inventory.distinct('genre');
        const authors = await Inventory.distinct('author');

        res.render("customer/main", { books, customer, genres, authors });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Render the Inventory Page with filtered book data.
router.route('/').post(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const genres = await Inventory.distinct('genre');
        const authors = await Inventory.distinct('author');

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

        res.render('customer/main', { books, customer, genres, authors });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Render the Book Deatil Page with book data.
router.route('/:book_ID').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const book = await Inventory.findById(req.params.book_ID);
        res.render('customer/book-detail', { customer, book });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Ordering Page with book data.
router.route('/:book_ID/ordering').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const book = await Inventory.findById(req.params.book_ID);

        res.render('customer/ordering', { customer, book });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Add new order function.
router.route('/:book_ID/ordering').post(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const book = await Inventory.findById(req.params.book_ID);

        let totalPrice = book.price * req.body.quantity;

        const newOrder = new Order({
            customer: {
                ID: customer.id,
                username: customer.username,
                email: customer.email,
                phone: customer.phone,
                address: customer.home_address,
            },
            book: {
                ID: book.id,
                image: {
                    data: book.image.data,
                    mimeType: book.image.mimeType,
                },
                title: book.book_title,
                author: book.author,
            },
            payment_type: req.body.payment_type,
            card_info: {
                card_number: req.body.card_number,
                CVV: req.body.CVV,
                expiration: {
                    month: req.body.expiration_month,
                    year: req.body.expiration_year,
                }
            },
            quantity: req.body.quantity,
            price: totalPrice,
            shipping_date: req.body.shipping_date,
            shipping_address: req.body.shipping_address,
            status: 'Pending',
        });

        const newOrderData = await newOrder.save();
        console.log('Successfully added new order, ID:' + newOrderData.id);

        res.redirect(`/customer/${req.userID}/book_search`);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;