const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InquiryReplySchema = new Schema({
    user_ID: String,
    pfp: {
        data: Buffer,
        mimeType: String,
    },
    username: String,
    user_role: String,
    text: String,
}, {
    timestamps: true
});

const inquirySchema = new Schema({
    customer_username: {
        type: String,
        required: true,
    },
    customer_ID: {
        type: String,
        required: true,
    },
    profile_picture: {
        data: Buffer,
        mimeType: String,
    },
    topic: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    replies: [InquiryReplySchema],
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;