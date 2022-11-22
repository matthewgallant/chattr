/**
 * @file Database model for an account
 * @copyright Matthew Gallant
 */

const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Account', accountSchema)
