/**
 * @file Middleware that handles protecting private routes
 * @copyright Matthew Gallant
 */

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const Account = require('../models/accountModel')

const auth = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.body.user = await Account.findById(decoded.id).select('-password')

            // Verify account exists
            if (!req.body.user) {
                throw new Error('Was not able to locate details for the account.')
            }

            next()
        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Could not authenticate user as no token was sent.')
    }
})

module.exports = auth
