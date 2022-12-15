/**
 * @file Routes for channels
 * @copyright Matthew Gallant
 */

const express = require('express')
const messageRouter = express.Router()

const auth = require('../middleware/authMiddleware')
const {
    getChannels,
    createChannel,
    editChannel,
    deleteChannel
} = require('../controllers/channelController')

messageRouter.route('/')
    .get(auth, getChannels)
    .post(auth, createChannel)
messageRouter.route('/:id')
    .put(auth, editChannel)
    .delete(auth, deleteChannel)

module.exports = messageRouter
