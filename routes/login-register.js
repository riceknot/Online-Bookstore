const router = require('express').Router();
const bcrypt = require('bcrypt');
let Account = require('../models/account_model');

//Render the login page when the user access URL '/login'
router.route('/login').get((req, res) => {
    res.render('login');
});

//Render the owner register page
router.route('/register-o').get((req, res) => {
    res.render('register_o');
});

//Render the customer register page
router.route('/register-c').get((req, res) => {
    res.render('register_c');
});


//Registration for Owner
router.route('/register-o').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hasedPASS = await bcrypt.hash(req.body.password, salt);  //Hashing (encrypting) password with Bcrypt.

        const account = new Account({
            user_role: req.body.role,
            username: req.body.username,
            password: hasedPASS,    //Storing the hased password. 
            email: req.body.email,
            phone: req.body.phone,
        });

        await account.save()  //Save the data into the Account collection.
            .then(() => {
                console.log('New owner registered!');
                res.redirect('/login'); //Redirect the user to the login page.
            })
            .catch((error) => {
                console.log(error.message);
            });

    } catch (error) {
        console.log(error.message);
    }
});

//Registration for Customer
router.route('/register-c').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hasedPASS = await bcrypt.hash(req.body.password, salt);  //Hashing (encrypting) password with Bcrypt.

        const account = new Account({
            user_role: req.body.role,
            full_name: req.body.full_name,
            username: req.body.username,
            password: hasedPASS,    //Storing the hased password. 
            email: req.body.email,
            phone: req.body.phone,
            home_address: req.body.home_address
        });

        await account.save()  //Save the data into the Account collection.
            .then(() => {
                console.log('New customer registered!');
                res.redirect('/login'); //Redirect the user to the login page.
            })
            .catch((error) => {
                console.log(error.message);
            });

    } catch (error) {
        console.log(error.message);
    }
});

//--------Login-----------//
router.route('/login').post(async (req, res) => {
    try {
        const account = await Account.findOne({ $or: [{ username: req.body.loginInput }, { email: req.body.loginInput }, { phone: req.body.loginInput }] });  //Take user login input and find if it matches any data with either phone, email, or username.
        if (account) {
            const result = bcrypt.compare(req.body.password, account.password);   //Use bcrypt to decrypt the password inside the database and compare it with the inputted password.
            if (result) {
                console.log(`Login successful as ${account.user_role}!`);
                return res.redirect(`/${account.user_role}/${account.id}`); //Redirect user to URL based on their role and ID.
            } else {
                return console.log('Invalid credentials!');
            }
        } else {
            return console.log('Invalid credentials!');
        }
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;