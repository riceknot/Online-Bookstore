const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_username: {
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
    card_info: {
        card_number: {
            type: Number
        },
        CVV: {
            type: Number
        },
        expiration: {
            type: Date
        }
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;