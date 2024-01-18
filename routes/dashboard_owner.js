const router = require('express').Router();
let Inventory = require('../models/inventory_model');
let Account = require('../models/account_model');
let Order = require('../models/order_model');

//Render the Dashboard Page.
router.route('/').get(async (req, res) => {
    try {
        const owner = await Account.findById(req.userID);
        const customers = await Account.countDocuments({ role: 'customer' });
        const orders = await Order.countDocuments({});

        const earnings = await Order.aggregate([
            {
                $match: {
                    status: 'Accepted'
                }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: '$price' }
                }
            }
        ]);

        const extractedEarnings = earnings.length > 0 ? earnings[0].totalPrice : 0;

        const totalBooks = await Inventory.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: '$quantity' }
                }
            }
        ]);

        const extractedTotalBooks = totalBooks.length > 0 ? totalBooks[0].totalQuantity : 0;

        res.render('owner/dashboard', { owner, customers, orders, earnings: extractedEarnings, totalBooks: extractedTotalBooks });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//Send chart data.
router.route('/chart').get(async (req, res) => {
    try {
        const chartData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    totalPrice: { $sum: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    totalPrice: 1
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1
                }
            }
        ]);

        res.json(chartData);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;