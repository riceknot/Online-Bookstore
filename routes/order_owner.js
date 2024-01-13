const router = require('express').Router();
let Order = require('../models/order_model');
let Account = require('../models/account_model');
let Inventory = require('../models/inventory_model');

//Render the Order (Owner) page.
router.route('/').get(async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Pending' }).sort({ createdAt: -1 }); //Filter only 'Pending' orders.
        const owner = await Account.findById(req.userID);

        res.render('owner/order', { orders, owner });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Order History (Owner) page.
router.route('/history').get(async (req, res) => {
    try {
        const orders = await Order.find({ status: { $ne: 'Pending' } }).sort({ createdAt: -1 }); //Filter orders without the status 'Pending'
        const owner = await Account.findById(req.userID);

        res.render('owner/order-history', { orders, owner });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Order Detail (Owner) page.
router.route('/order_ID').get(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const order = await Order.findById(req.params.order_ID);
        const customer = await Account.findById(order.customer_ID);

        let templateName = 'owner/order-detail'; //Default template name

        // Change the EJS file to render based on the status of the order.
        if (order.status === 'accepted') {
            templateName += '-accepted';
        } else if (order.status === 'cancelled') {
            templateName += '-cancel';
        }

        // Change EJS file based on payment type.
        if (order.payment_type != 'card') {
            templateName += '2';
        }

        console.log(templateName);

        res.render(templateName, { order, owner, customer });

    } catch (err) {
        console.log(err.message);
    }
});

//Function to accept orders.
router.route('/order_ID/accept').post(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);

        const updateOrder = await Order.findByIdAndUpdate(
            req.params.order_ID,
            { $set: { status: 'accepted' } }, // Update the 'status' field
            { new: true }
        );

        res.redirect(`/${owner.user_role}/${owner.id}/order/${updateOrder.id}`);

    } catch (err) {
        console.log(err.message);
    }
});

//Function to cancel orders.
router.route('/order_ID/cancel').post(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);

        const updateOrder = await Order.findByIdAndUpdate(
            req.params.order_ID,
            { $set: { status: 'cancelled' } }, // Update the 'status' field
            { new: true }
        );

        res.redirect(`/${owner.user_role}/${owner.id}/order/${updateOrder.id}`);

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;