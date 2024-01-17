const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        ID: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        }
    },
    book: {
        ID: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            data: Buffer,
            mimeType: String,
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
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
            month: {
                type: String,
            },
            year: {
                type: String,
            }
        }
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    shipping_date: {
        type: String,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;