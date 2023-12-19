const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_name: {
        type: String,
        required: true,
        trim: true
    },
    customer_ID: {
        type: String,
        required: true,
    },
    book_name: {
        type: String,
        required: true,
        trim: true
    },
    book_ID: {
        type: String,
        required: true,
        trim: true
    },
    payment_type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;