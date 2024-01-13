const router = require('express').Router();
let Order = require('../models/order_model');
let Account = require('../models/account_model');
let Inventory = require('../models/inventory_model');

//Render the Order (Customer) page.
router.route('/').get(async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Pending' }).sort({ createdAt: -1 }); //Filter only 'Pending' orders.
        const customer = await Account.findById(req.userID);

        res.render('customer/order', { orders, customer });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Order History (Customer) page.
router.route('/history').get(async (req, res) => {
    try {
        const orders = await Order.find({ status: { $ne: 'Pending' } }).sort({ createdAt: -1 }); //Filter orders without the status 'Pending'
        const customer = await Account.findById(req.userID);

        res.render('customer/order-history', { orders, customer });
    } catch (err) {
        console.log(err.message);
    }
});

//Render the Order Detail (Customer) page.
router.route('/order_ID').get(async (req, res) => {
    try {
        const customer = await Account.findById(req.userID);
        const order = await Order.findById(req.params.order_ID);

        let templateName = 'customer/order-detail'; //Default template name

        // Change the EJS file to render based on the status of the order.
        if (order.status === 'Accepted') {
            templateName += '-accepted';
        } else if (order.status === 'Cancelled') {
            templateName += '-cancel';
        }

        // Change EJS file based on payment type.
        if (order.payment_type != 'card') {
            templateName += '2';
        }

        console.log(templateName);

        res.render(templateName, { order, customer });

    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;