/**
 * @file Database model for a message
 * @copyright Matthew Gallant
 */

const mongoose = require('mongoose')

const channelSchema = mongoose.Schema({
    name: String,
    owner: mongoose.Schema.Types.ObjectId
}, { timestamps: true })

module.exports = mongoose.model('Channel', channelSchema)
