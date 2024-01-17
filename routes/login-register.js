const router = require('express').Router();
const bcrypt = require('bcrypt');
let Account = require('../models/account_model');

//Render the login page when the user access URL '/login'
router.route('/login').get((req, res) => {
    res.render('login/login');
});

//Render the owner register page
router.route('/register-owner').get((req, res) => {
    res.render('login/register-owner');
});

//Render the customer register page
router.route('/register-customer').get((req, res) => {
    res.render('login/register-customer');
});


//Registration for Owner
router.route('/register-owner').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hasedPASS = await bcrypt.hash(req.body.password, salt);  //Hashing (encrypting) password with Bcrypt.

        const account = new Account({
            user_role: req.body.role,
            profile_picture: {
                data: req.files.pfp.data,
                mimeType: req.files.pfp.mimetype
            },
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
router.route('/register-customer').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hasedPASS = await bcrypt.hash(req.body.password, salt);  //Hashing (encrypting) password with Bcrypt.

        const account = new Account({
            user_role: req.body.role,
            profile_picture: {
                data: req.files.pfp.data,
                mimeType: req.files.pfp.mimetype
            },
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

//Login
router.route('/login').post(async (req, res) => {
    try {
        const account = await Account.findOne({ $or: [{ username: req.body.loginInput }, { email: req.body.loginInput }] });  //Take user login input and find if it matches any data with either email, or username.
        if (account) {
            const result = bcrypt.compare(req.body.password, account.password);   //Use bcrypt to decrypt the password inside the database and compare it with the inputted password.
            if (result) {
                console.log(`Login successful as ${account.user_role}!`);

                if (account.user_role == 'owner') {
                    return res.redirect(`/${account.user_role}/${account.id}/inventory#product-page`); //Redirect user to URL based on their role and ID.

                } else if (account.user_role == 'customer') {
                    return res.redirect(`/${account.user_role}/${account.id}/book_search`); //Redirect user to URL based on their role and ID.
                }
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