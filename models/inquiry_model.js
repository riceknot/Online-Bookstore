const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    customer_name: {
        type: String,
        required: true,
    },
    customer_ID: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    replies: {
        type: Array,
    },
    status: {
        type: Boolean,
    }
}, {
    timestamps: true
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;