const router = require('express').Router();
let Announcement = require('../models/announcement_model');
let Account = require('../models/account_model');


//Render the Announcement (Owner) Page with all announcement data.
router.route('/').get(async(req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const announcement = await Announcement.find();
        res.render("owner/announcement",{owner,announcement});
    } catch (err) {
        console.log(err.message);
    }
});
router.route('/add').get(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const announcement = await Announcement.find();
        res.render("owner/add-annoucement", { owner, announcement });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Announcement Edit/Reply Page with announcment data and all replies.
router.route('/:announcement_ID').get(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const announcement = await Announcement.findById(req.params.announcement_ID);
        res.render("owner/announcement-detail", { announcement,owner });

    } catch (err) {
        console.log(err.message);
    }
});

//Reply function
router.route('/:announcement_ID/reply').post(async (req, res) => {
    try {

        const announcement = await Announcement.findById(req.params.announcement_ID);
        const owner = await Account.findById(req.userID);

        announcement.replies.push({
            user_ID: req.userID,
            user: owner.username,
            text: req.body.text,
            user_role: 'owner'
        });

        await announcement.save();

        res.redirect(`/owner/${req.userID}/announcement/${req.params.announcement_ID}`);

    } catch (err) {
        console.log(err.message);
    }
});


//Adding an announcement
// Adding an announcement
router.route('/add').post(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const announcement = new Announcement({
            owner_username: owner.username,
            title: req.body.title,
            text: req.body.text,
            replies: []
        });

        announcement.save()
            .then(() => {
                console.log('New announcement added!');
                res.redirect(`/owner/${req.userID}/announcement`);
            })
            .catch(err => console.log(err.message));
    } catch (err) {
        console.log(err.message);
    }
});


//Edit announcement function
router.route('/:announcement_ID/edit').post(async (req, res) => {
    try {
        await Announcement.findByIdAndUpdate(req.params.announcement_ID, {
            title: req.body.title,
            text: req.body.text
        }, { new: true });

        console.log('Announcement edited!')
        res.redirect(`/owner/${req.user_ID}/announcement`);

    } catch (err) {
        console.log(err.message);
    }
});

//Delete announcement function
router.route('/:announcement_ID/delete').post(async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.announcement_ID)

        console.log('Announcement deleted!')
        res.redirect(`/owner/${req.userID}/announcement`);

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;