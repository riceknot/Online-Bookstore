const router = require('express').Router();
let Announcement = require('../models/announcement_model');
let Account = require('../models/account_model');


//Render the Announcement (Customer) Page with all announcement data.
router.route('/').get(async (req, res) => {
    try {
        const announcement = await Announcement.find({})
        const customer = await Account.findById(req.userID);
        res.render("customer/announcement", { customer, announcement });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});


//Render the Announcement Detail Page with announcment data and all replies.
router.route('/:announcement_ID').get(async (req, res) => {
    try {

        const customer = await Account.findById(req.userID);
        const announcement = await Announcement.findById(req.params.announcement_ID);
        res.render('customer/announcement-detail', { announcement, customer });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});



//Reply function
router.route('/:announcement_ID/reply').post(async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.announcement_ID);
        const customer = await Account.findById(req.userID);

        announcement.replies.push({
            user_ID: req.userID,
            pfp: {
                data: customer.profile_picture.data,
                mimeType: customer.profile_picture.mimeType,
            },
            username: customer.username,
            user_role: 'customer',
            text: req.body.text
        });

        await announcement.save();

        res.redirect(`/customer/${req.userID}/announcement/${req.params.announcement_ID}`);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;