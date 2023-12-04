const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    user_role: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
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
        required: true,
        unique: true,
        trim: true,
        min: 11,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
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