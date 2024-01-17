const router = require('express').Router();
let Account = require('../models/account_model');


//Render the Profile Page for owner.
router.route('/').get(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);

        res.render('owner/profile', { owner });
    } catch (err) {
        console.log(err.message);
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

        const updatedOwner = await Account.findByIdAndUpdate(req.userID, newData, { new: true });

        console.log('Successfully updated owner profle!');
        res.redirect(`/owner/${req.userID}/profile`);

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;