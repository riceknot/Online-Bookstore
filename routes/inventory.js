const router = require('express').Router();
let Inventory = require('../models/inventory_model');
let Account = require('../models/account_model');

//Render the Inventory Page with all book data.
router.route('/').get(async (req, res) => {
    try {
        const books = await Inventory.find({});
        const owner = await Account.findById(req.userID);
        const genres = await Inventory.distinct('genre');
        const authors = await Inventory.distinct('author');

        res.render('owner/inventory', { books, owner, genres, authors });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Render the Inventory Page with filtered book data.
router.route('/').post(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
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

        res.render('owner/inventory', { books, owner, genres, authors });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});


//Render Edit page.
router.route('/:bookID').get(async (req, res) => {
    try {
        const book = await Inventory.findById(req.params.bookID);
        const owner = await Account.findById(req.userID);

        res.render('owner/edit2', { book, owner });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');

    }
});



//Adding a new book.
router.route('/add').post((req, res) => {
    const newBook = new Inventory({
        book_title: req.body.title,
        genre: req.body.genre,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: {
            data: req.files.image.data,
            mimeType: req.files.image.mimetype
        }
    });
    newBook.save()
        .then(() => {
            console.log('New book added!');
            res.redirect(`/owner/${req.userID}/inventory#product-page`)
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        });
});

//Updating a book.
router.route('/:bookID/update').post((req, res) => {
    const updateBook = {
        book_title: req.body.title,
        genre: req.body.genre,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    if (req.files && req.files.image) {
        updateBook.image = {
            data: req.files.image.data,
            mimeType: req.files.image.mimetype
        }
    }

    Inventory.findByIdAndUpdate(req.params.bookID, updateBook, { new: true })
        .then(() => {
            console.log('Update book successfully!');
            res.redirect(`/owner/${req.userID}/inventory#product-page`);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        });
});


//Deleting a book.
router.route('/:bookID/delete').post((req, res) => {
    Inventory.findByIdAndDelete(req.params.bookID)
        .then(() => {
            console.log('Deleted book successfully!');
            res.redirect(`/owner/${req.userID}/inventory#product-page`);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router;