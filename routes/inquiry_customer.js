const router = require('express').Router();
let Inquiry = require('../models/inquiry_model');
let Account = require('../models/account_model');

//Render the Inquiry (Customer) Page with all Inquiry data.
router.route('/').get(async (req, res) => {
    try {
        const inquiries = await Inquiry.find();

        const openInquiry = inquiries.filter(inquiry => inquiry.status === 'open');
        const closedInquiry = inquiries.filter(inquiry => inquiry.status === 'closed');

        res.render('Inquiry_Customer', { openInquiry, closedInquiry });

    } catch (err) {
        console.log(err.message);
    }
});

//Render the Inquiry Detail Page with inquiry data and all replies.
router.route('/:inquiry_ID').get(async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.inquiry_ID);
        res.render('Inquiry_Detail', { inquiry });

    } catch (err) {
        console.log(err.message);
    }
});

//Reply function
router.route('/:inquiry_ID/reply').post(async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.inquiry_ID);
        const customer = await Account.findById(req.params.user_ID);

        inquiry.replies.push({
            user_ID: req.params.user_ID,
            profile_picture: {
                data: customer.profile_picture.data,
                mimeType: customer.profile_picture.mimeType
            },
            username: customer.username,
            text: req.body.text
        });

        await inquiry.save();

        res.redirect(`/customer/${req.params.user_ID}/inquiry/${req.params.inquiry_ID}`);

    } catch (err) {
        console.log(err.message);
    }
});


module.exports = router;