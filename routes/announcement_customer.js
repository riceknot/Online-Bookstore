const router = require('express').Router();
let Announcement = require('../models/announcement_model');
let Account = require('../models/account_model');


//Render the Announcement (Customer) Page with all announcement data.
router.route('/').get((req, res) => {
    Announcement.find()
        .then((announcement) => {
            res.render('Announcement_Customer', { announcement });
        })
        .catch((error) => {
            console.log(error.message);
        });
});


//Render the Announcement Detail Page with announcment data and all replies.
router.route('/:announcement_ID').get(async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.announcement_ID);
        res.render('Announcement_Detail', { announcement });

    } catch (err) {
        console.log(err.message);
    }
});

//Reply function
router.route('/:announcement_ID/reply').post(async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.announcement_ID);
        const customer = await Account.findById(req.params.user_ID);

        announcement.replies.push({
            user_ID: req.params.user_ID,
            profile_picture: {
                data: customer.profile_picture.data,
                mimeType: customer.profile_picture.mimeType
            },
            username: customer.username,
            text: req.body.text
        });

        await announcement.save();

        res.redirect(`/customer/${req.params.user_ID}/announcement/${req.params.announcement_ID}`);

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;