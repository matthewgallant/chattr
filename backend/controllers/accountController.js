/**
 * @file Controller for all account routes
 * @copyright Matthew Gallant
 */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const checkRequired = require('../utilities/checkRequired')
const Account = require('../models/accountModel')

// @desc    Register new account
// @route   POST /api/account/register
// @access  Public
const registerAccount = asyncHandler(async (req, res) => {
    checkRequired(['name', 'email', 'password'], req, res)
    const { name, email, password } = req.body

    // Check if account exists already
    const existingAccount = await Account.findOne({ email })
    if (existingAccount) {
        res.status(400)
        throw new Error('An account with this email already exists.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create account
    const newAccount = await Account.create({
        name,
        email,
        password: hashedPassword
    })

    if (newAccount) {
        res.status(201).json({
            _id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email,
            token: generateToken(newAccount._id),
        })
    } else {
        res.status(400)
        throw new Error('An unknown error has occurred while registering. Please try again later.')
    }
})

// @desc    Authenticate an account
// @route   POST /api/account/login
// @access  Public
const loginAccount = asyncHandler(async (req, res) => {
    checkRequired(['email', 'password'], req, res)
    const { email, password } = req.body

    // Check for existing account
    const account = await Account.findOne({ email })

    // Attempt to authenticate account
    if (account && (await bcrypt.compare(password, account.password))) {
        res.json({
            _id: account.id,
            name: account.name,
            email: account.email,
            token: generateToken(account._id),
        })
    } else {
        res.status(400)
        throw new Error('Unable to login to your account. Check your password and try again.')
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerAccount,
    loginAccount
}
