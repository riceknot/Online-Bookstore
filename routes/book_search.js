const router = require('express').Router();
let Inventory = require('../models/inventory_model');

//Render the Book Search Page with all books data.
router.route('/').get((req, res) => {
    Inventory.find()
        .then((books) => {
            res.render('bookSearch', { books });
        })
        .catch((error) => {
            console.log(error.message);
        });
});

//Render the Book Search Page with books data based on the Search and Filter options.
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
            return res.render('bookSearch', { message: 'No books found based on the search criteria.' }); //Render the Inventory Page with the error message.
        }

        res.render('bookSearch', { filteredBooks }); // Render the Inventory Page with the specified books.
    }
    catch (error) {
        console.log(error.message);
    }
});

module.exports = router;