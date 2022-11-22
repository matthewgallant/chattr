/**
 * @file Database model for a message
 * @copyright Matthew Gallant
 */

const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    message: String,
    channel: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)
