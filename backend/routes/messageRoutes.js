/**
 * @file Routes for messages
 * @copyright Matthew Gallant
 */

const express = require('express')
const messageRouter = express.Router()

const auth = require('../middleware/authMiddleware')
const {
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage
} = require('../controllers/messageController')

messageRouter.route('/')
    .get(auth, getMessages)
    .post(auth, sendMessage)
messageRouter.route('/:id')
    .put(auth, editMessage)
    .delete(auth, deleteMessage)

module.exports = messageRouter
