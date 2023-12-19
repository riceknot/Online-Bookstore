const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnnouceReplySchema = new Schema({
    user_ID: String,
    profile_picture: {
        data: Buffer,
        mimeType: String,
    },
    username: String,
    text: String,
}, {
    timestamps: true
});

const announcementSchema = new Schema({
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