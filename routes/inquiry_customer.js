const router = require('express').Router();
let Inquiry = require('../models/inquiry_model');
let Account = require('../models/account_model');

//Render the Inquiry (Customer) Page with all Inquiry data.
router.route('/').get(async (req, res) => {
    try {
        const inquiries = await Inquiry.find();

        const customer = await Account.findById(req.userID);
        const openInquiry = inquiries.filter(inquiry => inquiry.status === 'open');
        const closedInquiry = inquiries.filter(inquiry => inquiry.status === 'closed');

        res.render('customer/inquiry', { openInquiry, closedInquiry,customer,inquiries });

    } catch (err) {
        console.log(err.message);
    }
});

router.route('/add').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const inquiry = await Inquiry.find();
        res.render("customer/new-inquiry", { customer, inquiry });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Inquiry Detail Page with inquiry data and all replies.
router.route('/:inquiry_ID').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const inquiry = await Inquiry.findById(req.params.inquiry_ID);
        res.render('customer/inquiry-detail', { inquiry,customer });

    } catch (err) {
        console.log(err.message);
    }
});

// Adding an inquiry
router.route('/add').post(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const inquiry = new Inquiry({
            customer_ID: req.userID,
            customer_username: customer.username,
            title: req.body.title,
            topic: req.body.topic,
            text: req.body.text,
            status: 'Open',
            replies: []
        });

        inquiry.save()
            .then(() => {
                console.log('New inquiry added!');
                res.redirect(`/customer/${req.userID}/inquiry`);
            })
            .catch(err => console.log(err.message));
    } catch (err) {
        console.log(err.message);
    }
});

//Reply function
router.route('/:inquiry_ID/reply').post(async (req, res) => {
    try {

        const inquiry = await Inquiry.findById(req.params.inquiry_ID);
        const customer = await Account.findById(req.userID);

        inquiry.replies.push({
            user_ID: req.userID,
            username: customer.username,
            user_role: 'customer',
            text: req.body.text
        });

        await inquiry.save();

        res.redirect(`/customer/${req.userID}/inquiry/${req.params.inquiry_ID}`);

    } catch (err) {
        console.log(err.message);
    }
});


module.exports = router;