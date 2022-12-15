/**
 * @file Controller for all channel routes
 * @copyright Matthew Gallant
 */

const asyncHandler = require('express-async-handler')

const checkRequired = require('../utilities/checkRequired')
const Channel = require('../models/channelModel')

// @desc    Get all channels
// @route   GET /api/channel
// @access  Private
const getChannels = asyncHandler(async (req, res) => {
    const channels = await Channel.find()

    if (channels) {
        res.status(200).json(channels)
    } else {
        throw new Error("Unable to load channels. Please try again.")
    }
})

// @desc    Create a channel
// @route   POST /api/channel
// @access  Private
const createChannel = asyncHandler(async (req, res) => {
    checkRequired(['name', 'user'], req, res)

    const channel = await Channel.create({
        name: req.body.name,
        owner: req.body.user
    })

    if (channel) {
        res.status(201).json(channel)
    } else {
        throw new Error("Unable to create channel. Please try again.")
    }
})

// @desc    Edit a channel
// @route   PUT /api/channel
// @access  Private
const editChannel = asyncHandler(async (req, res) => {
    checkRequired(['name'], req, res)
    await checkChannel(req, res)

    const channel = {
        name: req.body.name
    }

    const updatedChannel = await Channel.findByIdAndUpdate(req.params.id, channel, { new: true })
    
    if (updatedChannel) {
        res.status(200).json(updatedChannel)
    } else {
        throw new Error("The channel could not be updated. Please try again.")
    }
})

// @desc    Delete a channel
// @route   DELETE /api/channel
// @access  Private
const deleteChannel = asyncHandler(async (req, res) => {
    let channel = await checkChannel(req, res)
    await channel.remove()
    res.status(200).json({
        message: 'The channel has been deleted.'
    })
})

/**
 * Checks if a channel exists in the database and if the user has permission to modify it
 * 
 * @param {Object} req An express request object
 * @param {Object} res An express response object
 * @returns {Object} A channel schema object from the database
 */
const checkChannel = asyncHandler(async (req, res) => {

    // Check if channel already exists
    const channel = await Channel.findById(req.params.id)
    if (!channel) {
        res.status(400)
        throw new Error('The channel could not be found.')
    }

    // Make sure the user has permission to edit this channel
    if (req.body.user.id != channel.owner) {
        res.status(401)
        throw new Error('This user is not authorized to edit this channel.')
    }

    return channel
})

module.exports = {
    getChannels,
    createChannel,
    editChannel,
    deleteChannel
}
