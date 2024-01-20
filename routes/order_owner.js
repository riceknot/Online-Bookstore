const router = require('express').Router();
let Order = require('../models/order_model');
let Account = require('../models/account_model');
let Inventory = require('../models/inventory_model');

//Render the Order (Owner) page.
router.route('/').get(async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Pending' }) //Filter only 'Pending' orders.
        const owner = await Account.findById(req.userID);

        res.render('owner/order', { orders, owner });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Render the Order History (Owner) page.
router.route('/history').get(async (req, res) => {
    try {
        const orders = await Order.find({ status: { $ne: 'Pending' } }) //Filter orders without the status 'Pending'
        const owner = await Account.findById(req.userID);

        res.render('owner/order-history', { orders, owner });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Render the Order Detail (Owner) page.
router.route('/:order_ID').get(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const order = await Order.findById(req.params.order_ID);

        res.render('owner/order-detail', { order, owner });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Function to accept orders.
router.route('/:order_ID/accept').post(async (req, res) => {
    try {

        const order = await Order.findById(req.params.order_ID);
        const book = await Inventory.findById(order.book.ID);

        let deductedQuantity = book.quantity - order.quantity;

        if (deductedQuantity < 0) {
            console.log('Cannot accept order!');
            return res.status(400).send('Quantity will be lower than 0 if accepted!');
        } else {
            book.quantity = deductedQuantity;
            order.status = 'Accepted';

            await book.save();
            await order.save();
            console.log(`Accepted order successfully, ID: ${order.id}`);
            return res.redirect(`/owner/${req.userID}/order/${order.id}`);
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Function to cancel orders.
router.route('/:order_ID/cancel').post(async (req, res) => {
    try {

        const updateOrder = await Order.findByIdAndUpdate(
            req.params.order_ID,
            { $set: { status: 'Cancelled' } }, // Update the 'status' field
            { new: true }
        );

        console.log(`Cancenlled order successfully, ID: ${updateOrder.id}`);
        res.redirect(`/owner/${req.userID}/order/${updateOrder.id}`);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;