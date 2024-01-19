const router = require('express').Router();
let Account = require('../models/account_model');


//Render the Profile Page for customer.
router.route('/').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);

        res.render('customer/profile', { customer });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Edit profile function.
router.route('/edit').post(async (req, res) => {
    try {
        const newData = {
            full_name: req.body.full_name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            home_address: req.body.home_address
        };

        if (req.files && req.files.pfp) {
            newData.profile_picture = {
                data: req.files.pfp.data,
                mimeType: req.files.pfp.mimeType
            }
        };

        const updatedCustomer = await Account.findByIdAndUpdate(req.userID, newData, { new: true });

        console.log('Successfully updated customer profle!');
        res.redirect(`/customer/${req.userID}/profile`);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;