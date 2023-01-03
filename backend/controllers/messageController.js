/**
 * @file Controller for all message routes
 * @copyright Matthew Gallant
 */

const asyncHandler = require('express-async-handler')

const checkRequired = require('../utilities/checkRequired')
const Message = require('../models/messageModel')

// @desc    Send a message to a channel
// @route   POST /api/message
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
    checkRequired(['message', 'channel', 'user'], req, res)

    const message = await Message.create({
        message: req.body.message,
        channel: req.body.channel,
        user: req.body.user
    })

    if (message) {
        res.status(201).json(message)
    } else {
        throw new Error("Unable to send message. Please try again.")
    }
})

// @desc    Get messages from a channel
// @route   GET /api/message/:id
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({
        channel: req.params.id
    })

    if (messages) {
        res.status(200).json(messages)
    } else {
        throw new Error("Unable to load messages. Please try again.")
    }
})

// @desc    Edit a message in a channel
// @route   PUT /api/message/:id
// @access  Private
const editMessage = asyncHandler(async (req, res) => {
    checkRequired(['message'], req, res)
    await checkMessage(req, res)

    const message = {
        message: req.body.message
    }

    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, message, { new: true })
    
    if (updatedMessage) {
        res.status(200).json(updatedMessage)
    } else {
        throw new Error("The message could not be updated. Please try again.")
    }
})

// @desc    Delete a message in a channel
// @route   DELETE /api/message/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
    let message = await checkMessage(req, res)
    await message.remove()
    res.status(200).json({
        message: 'The message has been deleted.'
    })
})

/**
 * Checks if a message exists in the database and if the user has permission to modify it
 * 
 * @param {Object} req An express request object
 * @param {Object} res An express response object
 * @returns {Object} A message schema object from the database
 */
const checkMessage = asyncHandler(async (req, res) => {

    // Check if message already exists
    const message = await Message.findById(req.params.id)
    if (!message) {
        res.status(400)
        throw new Error('The message could not be found.')
    }

    // Make sure the user has permission to edit this message
    if (req.body.user.id != message.user) {
        res.status(401)
        throw new Error('This user is not authorized to edit this message.')
    }

    return message
})

module.exports = {
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage
}
