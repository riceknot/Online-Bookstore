const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnnouceReplySchema = new Schema({
    user_ID: String,
    profile_picture: {
        data: Buffer,
        mimeType: String,
    },
    user: String,
    user_role: String,
    text: String,
}, {
    timestamps: true
});

const announcementSchema = new Schema({
    owner_pfp: {
        data: Buffer,
        mimeType: String,
    },
    owner_username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    replies: [AnnouceReplySchema]
}, {
    timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;