const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');


//Connect to MongoDB database USERS
mongoose.connect('mongodb+srv://khaiminh2001:minh123@bing-chilling.nrj7j40.mongodb.net/Bookstore?retryWrites=true&w=majority')
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

//Use express-fileupload to handle upload files:
app.use(fileUpload());

//Use cors to send data through the same device.
app.use(cors());

//Routes for different URLs to pages (found in the 'routes' folder):
//Routes for login/register
const LoginRegister = require('./routes/login-register');

app.use('/', LoginRegister);

//Routes for Customer
const BookSearchPage = require('./routes/book_search');
const Announcement_Cust = require('./routes/announcement_customer');
const Inquiry_Cust = require('./routes/inquiry_customer');
const Order_Cust = require('./routes/order_customer');
const Profile_Cust = require('./routes/profile_customer');

app.use('/customer/:userID/book_search', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, BookSearchPage);
app.use('/customer/:userID/announcement', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Announcement_Cust);
app.use('/customer/:userID/inquiry', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Inquiry_Cust);
app.use('/customer/:userID/order', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Order_Cust);
app.use('/customer/:userID/profile', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Profile_Cust);


//Routes for Owner
const InventoryPage = require('./routes/inventory');
const Announcement_Owner = require('./routes/announcement_owner');
const Inquiry_Owner = require('./routes/inquiry_owner');
const Order_Owner = require('./routes/order_owner');
const Profile_Owner = require('./routes/profile_owner');

app.use('/owner/:userID/inventory', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, InventoryPage);
app.use('/owner/:userID/announcement', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Announcement_Owner);
app.use('/owner/:userID/inquiry', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Inquiry_Owner);
app.use('/owner/:userID/order', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Order_Owner);
app.use('/owner/:userID/profile', (req, res, next) => {
    req.userID = req.params.userID;
    next();
}, Profile_Owner);
