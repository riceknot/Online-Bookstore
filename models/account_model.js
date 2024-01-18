const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    user_role: {
        type: String,
        required: true
    },
    profile_picture: {
        data: Buffer,
        mimeType: String,
    },
    full_name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    home_address: {
        type: String,
    }
}, {
    timestamps: true
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;