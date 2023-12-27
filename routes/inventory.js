const router = require('express').Router();
let Inventory = require('../models/inventory_model');
let Account = require('../models/account_model');

//Render the Inventory Page with all books data.
router.route('/').get(async (req, res) => {
    try {
        const books = await Inventory.find({});
        const owner = await Account.findById(req.userID);

        res.render('owner/inventory', { books, owner });
    } catch (err) {
        console.log(err.message);
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
    }
});

//Render the Inventory Page with books data based on the Search and Filter options.
router.route('/').post(async (req, res) => {
    try {
        let bookQuery = {};  //An object used to store the search term and all the filter options found through the 'query'. 
        const filterFields = ['genre', 'author', 'publisher', 'date'];

        filterFields.forEach(field => {  //Function used to store each filter option with data from query.
            if (req.query[`${field}Filter`]) {  //Check if query for filters are empty or not.
                bookQuery[field] = req.query[`${field}Filter`];
            }
        });

        if (req.query.searchTerm) { //If search query is not empty.
            const searchTerm = new RegExp(req.query.search, 'i');  //Use RegExp to make the search term case-insensitive.
            bookQuery.book_title = searchTerm;  // store the search term inside 'bookQuery' object.
        }

        const filteredBooks = await Inventory.find(bookQuery);  // Find specific books based on fields in 'bookQuery'.

        if (filteredBooks.length === 0) { // If no books found based on the search criteria.
            return res.render('inventoryPage', { message: 'No books found based on the search criteria.' }); //Render the Inventory Page with the error message.
        }

        res.render('inventoryPage', { filteredBooks }); // Render the Inventory Page with the specified books.
    }
    catch (error) {
        console.log(error.message);
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
        .catch(err => console.log(err.message));
});

//Updating a book.
router.route('/:bookID/update').post((req, res) => {
    Inventory.findByIdAndUpdate(req.params.bookID, {
        book_title: req.body.book_title,
        genre: req.body.genre,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: {
            data: req.files.image.data,
            mimeType: req.files.image.mimetype
        }
    }, { new: true })
        .then(() => {
            console.log('Update book successfully!');
            res.redirect(`/owner/${req.userID}/inventory#product-page`);
        })
        .catch(err => console.log(err.message));
});


//Deleting a book.
router.route('/:bookID/delete').post((req, res) => {
    Inventory.findByIdAndDelete(req.params.bookID)
        .then(() => {
            console.log('Deleted book successfully!');
            res.redirect(`/owner/${req.userID}/inventory#product-page`);
        })
        .catch(err => { console.log(err.message) });
});

module.exports = router;