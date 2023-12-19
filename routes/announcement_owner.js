const router = require('express').Router();
let Announcement = require('../models/announcement_model');
let Account = require('../models/account_model');


//Render the Announcement (Owner) Page with all announcement data.
router.route('/').get((req, res) => {
    Announcement.find()
        .then((announcement) => {
            res.render('Announcement_Owner', { announcement });
        })
        .catch((error) => {
            console.log(error.message);
        });
});


//Render the Announcement Edit/Reply Page with announcment data and all replies.
router.route('/:announcement_ID').get(async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.announcement_ID);
        res.render('Announcement_Edit', { announcement });

    } catch (err) {
        console.log(err.message);
    }
});

//Reply function
router.route('/:announcement_ID/reply').post(async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.announcement_ID);
        const owner = await Account.findById(req.params.user_ID);

        announcement.replies.push({
            user_ID: req.params.user_ID,
            profile_picture: {
                data: owner.profile_picture.data,
                mimeType: owner.profile_picture.mimeType
            },
            username: owner.username,
            text: req.body.text
        });

        await announcement.save();

        res.redirect(`/owner/${req.params.user_ID}/announcement/${req.params.announcement_ID}`);

    } catch (err) {
        console.log(err.message);
    }
});


//Adding an announcement
router.route('/add').post((req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        text: req.body.text,
        replies: []
    });
    announcement.save()
        .then(() => {
            console.log('New announcement added!');
            res.redirect(`/owner/${req.params.user_ID}/announcement`)
        })
        .catch(err => console.log(err.message));
});

//Edit announcement function
router.route('/:announcement_ID/edit').post(async (req, res) => {
    try {

        await Announcement.findByIdAndUpdate(req.params.announcement_ID, {
            title: req.body.title,
            text: req.body.text
        }, { new: true });

        console.log('Announcement edited!')
        res.redirect(`/owner/${req.params.user_ID}/announcement`);

    } catch (err) {
        console.log(err.message);
    }
});

//Delete announcement function
router.route('/:announcement_ID/delete').post(async (req, res) => {
    try {

        await Announcement.findByIdAndDelete(req.params.announcement_ID)

        console.log('Announcement deleted!')
        res.redirect(`/owner/${req.params.user_ID}/announcement`);

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;