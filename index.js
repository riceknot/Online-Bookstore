const express = require('express');
const app = express();
const mongoose = require('mongoose');


//Connect to MongoDB database USERS
mongoose.connect('mongodb+srv://khaiminh2001:minh123@bing-chilling.nrj7j40.mongodb.net/USERS?retryWrites=true&w=majority')
    .then(() => {
        console.log(`Connection established!`);
    })
    .catch((error) => {
        console.log(error.message);
    });

//Listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Use 'express.urlencoded' middleware to parse incoming data: 
app.use(express.urlencoded({ extended: true }));

//Render ejs files:
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Use express json to send data as json:
app.use(express.json());


//Routes for different URLs to pages (found in the 'routes' folder):
const LoginRegister = require('./routes/login-register');
const InventoryPage = require('./routes/inventory');
const BookSearchPage = require('./routes/book_search');

app.use('/', LoginRegister);

app.use('/customer/:userID/book_search', BookSearchPage);

app.use('/owner/:userID/inventory', InventoryPage);