const router = require('express').Router();
let Inquiry = require('../models/inquiry_model');
let Account = require('../models/account_model');

//Render the Inquiry (Owner) Page with all Inquiry data.
router.route('/').get(async (req, res) => {
    try {
        const inquiries = await Inquiry.find();

        const openInquiry = inquiries.filter(inquiry => inquiry.status === 'open');
        const closedInquiry = inquiries.filter(inquiry => inquiry.status === 'closed');
        const owner = await Account.findById(req.userID);

        res.render('owner/inquiry', { openInquiry, closedInquiry, owner});

    } catch (err) {
        console.log(err.message);
    }
});

//Render the Inquiry Edit Page with inquiry data and all replies.
router.route('/:inquiry_ID').get(async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.inquiry_ID);
        res.render('Announcement_Edit', { inquiry });

    } catch (err) {
        console.log(err.message);
    }
});

//Reply function
router.route('/:inquiry_ID/reply').post(async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.inquiry_ID);
        const owner = await Account.findById(req.params.user_ID);

        inquiry.replies.push({
            user_ID: req.params.user_ID,
            profile_picture: {
                data: owner.profile_picture.data,
                mimeType: owner.profile_picture.mimeType
            },
            username: owner.username,
            text: req.body.text
        });

        await inquiry.save();

        res.redirect(`/owner/${req.params.user_ID}/inquiry/${req.params.inquiry_ID}`);

    } catch (err) {
        console.log(err.message);
    }
});

//Change status function
router.route('/:inquiry_ID/change_status').post(async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.inquiry_ID);

        if (inquiry.status === 'open') {

            console.log('Changing status to closed!');
            inquiry.status = 'closed';

        } else if (inquiry.status === 'closed') {

            console.log('Changing status to open!');
            inquiry.status = 'open';

        }

        await inquiry.save();
        res.redirect(`/inquiry/${req.params.inquiry_ID}`); // Redirect to inquiry detail page.


    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;