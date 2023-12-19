const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    replies: {
        type: Array
    }
}, {
    timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;